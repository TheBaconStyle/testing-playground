import { renderToHTML } from '@/views/email/ui/SignInEmail';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db, schema } from 'db';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Discord from 'next-auth/providers/discord';
import Email from 'next-auth/providers/nodemailer';
import { createTransport } from 'nodemailer';

export const adapter = DrizzleAdapter(db, {
  usersTable: schema.users,
  accountsTable: schema.accounts,
  authenticatorsTable: schema.authenticators,
  sessionsTable: schema.sessions,
  verificationTokensTable: schema.verificationTokens,
});

const authConfig: NextAuthConfig = {
  adapter,
  providers: [
    Discord,
    Email({
      server: {
        host: process.env.SMTP_HOST as string,
        port: Number(process.env.SMTP_PORT as string),
        secure: Boolean(JSON.parse(process.env.SMTP_SECURE as string)),
      },
      from: 'info@example.local',
      secret: process.env.AUTH_SECRET as string,
      maxAge: 60 * 15,
      async sendVerificationRequest({
        url,
        provider: { server, from },
        identifier,
      }) {
        console.log('SENDING SIGN IN EMAIL');

        const transport = createTransport(server);

        await transport.verify();

        await transport.sendMail({
          html: await renderToHTML({ url }),
          text: await renderToHTML({ url }, true),
          from,
          subject: 'Sign In To App',
          to: identifier,
        });
      },
    }),
  ],
  session: { strategy: 'database' },
  secret: process.env.AUTH_SECRET as string,
  cookies: {
    sessionToken: { name: 'example-session' },
    callbackUrl: { name: 'example-callback' },
    csrfToken: { name: 'example-csrf' },
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
