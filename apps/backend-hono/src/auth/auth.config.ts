import { render } from '@react-email/render';
import { betterAuth, BetterAuthOptions, type User,  } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin as adminPlugin,
  genericOAuth,
  openAPI,
  username,
} from "better-auth/plugins";
import { schema } from "db";
import { cookiePrefix } from "shared/auth/config";
import { ac, admin, user } from "shared/auth/roles";
import { env } from "shared/env/backend/env";
import { v7 } from "uuid";
import { db } from "../db/db.config";
import { mail } from '../mail/mail.config';
import SignInEmail from '../mail/templates/signin';

export const auth = betterAuth({
  database: drizzleAdapter(db, { schema, provider: "pg" }),
  plugins: [
    adminPlugin({
      ac,
      roles: {
        user,
        admin,
      },
    }),
    username(),
    openAPI({disableDefaultReference: true}),
    genericOAuth({
      config: [
        {
          clientId: env.AUTH_YANDEX_ID,
          clientSecret: env.AUTH_YANDEX_SECRET,
          providerId: "yandex",
          authorizationUrl: "https://oauth.yandex.ru/authorize",
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
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    async sendVerificationEmail({ user, url }) {
      await mail.sendMail({
        to: user.email,
        subject: "Verify your email",
        html: await render(SignInEmail({ url })),
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  telemetry: {
    enabled: false,
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
})


