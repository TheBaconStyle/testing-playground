import { discord } from '@/features/auth/api/discord';
import { db } from 'db/source/db';
import * as schema from 'db/source/schema';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { createSession, generateToken } from '@/features/auth/lib/session';
import { cookies } from 'next/headers';
import { buildHostUrl } from '@/shared/url/lib';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);

    const code = url.searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { mesage: 'No discord code', statusCode: 400 },
        { status: 400 },
      );
    }

    const tokens = await discord.provider.validateAuthorizationCode(code, null);

    const accessToken = tokens.accessToken();

    const accessTokenExpiresAt = tokens.accessTokenExpiresAt();

    const refreshToken = tokens.refreshToken();

    const accountResponse = await fetch(discord.getUserUrl, {
      headers: {
        Authorization: `${discord.tokenType} ${accessToken}`,
      },
    });

    const userAccount = await accountResponse.json();

    const accountValidationResult =
      discord.accountSchema.safeParse(userAccount);

    if (!accountValidationResult.success) {
      return NextResponse.json({
        message: 'Invalid account',
        statusCode: 400,
      });
    }

    const validAccount = accountValidationResult.data;

    const session = await db.transaction(async (sessionTx) => {
      const account = await sessionTx.transaction(async (accountTx) => {
        const existingAccount = await accountTx.query.accounts.findFirst({
          with: { user: true },
          where: (acc, { eq }) => eq(acc.providerAccountId, validAccount.id),
        });

        if (!existingAccount) {
          const user = await accountTx.transaction(async (userTx) => {
            const existingUser = await userTx.query.users.findFirst({
              where: (usr, { eq }) => eq(usr.email, validAccount.email),
            });

            if (existingUser) {
              return existingUser;
            }

            const newUser = (
              await userTx
                .insert(schema.users)
                .values({
                  email: validAccount.email,
                  emailVerified: new Date(),
                  name: validAccount.global_name,
                  image: `${discord.imageBaseUrl}/avatars/${validAccount.id}/${validAccount.avatar}`,
                })
                .returning()
            )[0];

            return newUser;
          });

          return (
            await accountTx
              .insert(schema.accounts)
              .values({
                userId: user.id,
                providerAccountId: validAccount.id,
                type: discord.providerType,
                provider: discord.providerName,
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_at: accessTokenExpiresAt,
                token_type: discord.tokenType,
                scope: discord.scopes.join(' '),
              })
              .returning()
          )[0];
        }

        return (
          await accountTx
            .update(schema.accounts)
            .set({
              access_token: accessToken,
              refresh_token: refreshToken,
              expires_at: accessTokenExpiresAt,
            })
            .where(
              eq(
                schema.accounts.providerAccountId,
                existingAccount.providerAccountId,
              ),
            )
            .returning()
        )[0];
      });

      const sessionToken = await generateToken();

      const session = await createSession(sessionToken, account.userId);

      return (
        await sessionTx.insert(schema.sessions).values(session).returning()
      )[0];
    });

    const cookieStore = await cookies();

    cookieStore.set('example-session', session.sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    const redirectUrl = request.cookies.get('example-callback');

    if (!redirectUrl || !redirectUrl.value) {
      const callbackUrl = buildHostUrl(request);

      callbackUrl.search = '';

      callbackUrl.pathname = '/dashboard';

      return NextResponse.redirect(callbackUrl);
    }

    return NextResponse.redirect(new URL(redirectUrl.value));
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      { mesage: 'Bad request', statusCode: 500 },
      { status: 500 },
    );
  }
}
