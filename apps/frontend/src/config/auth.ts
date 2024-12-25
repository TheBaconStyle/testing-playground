import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, schema } from "db";
import NextAuth, { NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import Email from "next-auth/providers/nodemailer";
import { createTransport } from "nodemailer";
import { renderToHTML } from "../emails/SignInEmail";

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
        host: process.env.SMTP_HOST!,
        port: Number(process.env.SMTP_PORT!),
        secure: Boolean(JSON.parse(process.env.SMTP_SECURE!)),
      },
      from: "info@example.local",
      secret: process.env.AUTH_SECRET!,
      async sendVerificationRequest({
        url,
        provider: { server, from },
        identifier,
      }) {
        const transport = createTransport(server);

        await transport.verify();

        await transport.sendMail({
          html: await renderToHTML({ url }),
          text: await renderToHTML({ url }, true),
          from,
          subject: "Sign In To App",
          to: identifier,
        });
      },
    }),
  ],
  secret: process.env.AUTH_SECRET!,
  session: { strategy: "database" },
  cookies: {
    sessionToken: { name: "example-session" },
    callbackUrl: { name: "example-callback" },
    csrfToken: { name: "example-csrf" },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
