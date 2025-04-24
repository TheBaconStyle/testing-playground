'use server';

import {
  createSMTPClient,
  registerEmailVerificationToken,
} from '@/shared/email/lib/email';
import { renderToHTML } from '@/views/email/ui/SignInEmail';
import { db } from '@/shared/db';
import * as schema from 'db/source/schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function emailSignIn(email: string, callbackUrl: string) {
  const user = await db.transaction(async (tx) => {
    const existingUser = await tx.query.users.findFirst({
      where: (us, { eq }) => eq(us.email, email),
    });

    if (existingUser) return existingUser;

    return (await tx.insert(schema.users).values({ email }).returning())[0];
  });

  const cookiesStore = await cookies();

  cookiesStore.set('example-callback', callbackUrl);

  const dbToken = await registerEmailVerificationToken(user.id);

  const hostUrl = new URL(process.env.AUTH_URL!);

  hostUrl.pathname = 'api/auth/signin/email/callback';

  hostUrl.searchParams.set('token', dbToken.token);

  const transport = await createSMTPClient();

  const subject = 'Вход в учетную запись';

  const from = 'info@baconcs.duckdns.org';

  const html = await renderToHTML({ url: hostUrl.href });

  await transport.sendMail({
    from,
    subject,
    to: user.email!,
    html,
  });

  redirect(`/auth/verify`);
}
