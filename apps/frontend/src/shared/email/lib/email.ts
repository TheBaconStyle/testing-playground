import { generateToken } from '@/features/auth/lib/session';
import { db } from 'db/source/db';
import { verificationTokens } from 'db/source/schema';
import { eq } from 'drizzle-orm';
import { createTransport } from 'nodemailer';

export async function createSMTPClient() {
  const transport = createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT!),
    secure: process.env.SMTP_SECURE === String(true),
  });

  await transport.verify().catch((e) => {
    console.error(e);
    throw new Error('Что-то пошло не так');
  });

  return transport;
}

export async function registerEmailVerificationToken(userId: string) {
  return (
    await db
      .insert(verificationTokens)
      .values({
        expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
        token: await generateToken(),
        userId,
      })
      .returning()
  )[0];
}

export async function applyEmailVerificationToken(token: string) {
  return await db.transaction(async (tx) => {
    const verificationToken = await tx.query.verificationTokens.findFirst({
      where: (vt, { eq, and, gte }) =>
        and(eq(vt.token, token), gte(vt.expires, new Date())),
      with: { user: true },
    });

    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.token, token));

    return verificationToken;
  });
}
