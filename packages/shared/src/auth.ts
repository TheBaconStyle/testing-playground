import { betterAuth, User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugin, openAPI, username } from "better-auth/plugins";
import { db } from "db";
import * as schema from "db/schema";
import { v7 } from "uuid";
import { cookiePrefix } from "./config";
import { ac, admin, user } from "./roles";
import { createTransport } from "nodemailer";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
  // trustedOrigins: [
  //   "https://www.baconcs.duckdns.org",
  //   "https://3rs27bxx-3000.inc1.devtunnels.ms",
  //   "http://localhost:3000",
  // ],
  database: drizzleAdapter(db, { provider: "pg", schema }),
  plugins: [
    adminPlugin({
      ac,
      roles: {
        user,
        admin,
      },
    }),
    username(),
    openAPI(),
    genericOAuth({
      config: [
        {
          providerId: "yandex",
          clientId: process.env.AUTH_YANDEX_ID!,
          clientSecret: process.env.AUTH_YANDEX_SECRET!,
          authorizationUrl: "https://oauth.yandex.ru/authorize",
          userInfoUrl: "https://login.yandex.ru/info",
          tokenUrl: "https://oauth.yandex.ru/token",
          getUserInfo: async (tokens) => {
            const res = await fetch("https://login.yandex.ru/info", {
              headers: {
                Authorization: `OAuth ${tokens.accessToken}`,
              },
            });

            if (!res.ok) return null;

            const userdata = await res.json();

            return {
              email: userdata.default_email,
              name: userdata.display_name,
              image: new URL(
                `${userdata.default_avatar_id}/islands-200`,
                "https://avatars.yandex.net/get-yapic/"
              ).href,
              emailVerified: true,
              id: userdata.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            } satisfies User;
          },
        },
      ],
    }),
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  socialProviders: {
    vk: {
      clientId: process.env.AUTH_VK_ID!,
      clientSecret: process.env.AUTH_VK_SECRET!,
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    async sendVerificationEmail({ user, url }, _) {
      const smtpTranspoer = createTransport({
        host: "localhost",
        port: 1025,
        secure: false,
      });

      await smtpTranspoer.sendMail({
        from: '"Habbins" <noreply@baconcs.duckdns.org>',
        to: user.email,
        subject: "Verify your email",
        text: `Please verify your email by clicking on the following link: ${url}`,
      });
    },
  },
  advanced: {
    useSecureCookies: true,
    cookiePrefix,
    cookies: {
      session_token: {
        attributes: {
          httpOnly: true,
        },
      },
    },
    database: {
      generateId: () => {
        return v7();
      },
    },
  },
});
