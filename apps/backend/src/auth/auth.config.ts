import { betterAuth, BetterAuthOptions, User } from 'better-auth';
import {
  admin as adminPlugin,
  genericOAuth,
  GenericOAuthConfig,
  openAPI,
  username,
} from 'better-auth/plugins';
import { cookiePrefix } from 'shared/auth/config';
import { ac, admin, user } from 'shared/auth/roles';
import { v7 } from 'uuid';

export const yandexOAuthDefaultOptions: Pick<
  GenericOAuthConfig,
  'providerId' | 'authorizationUrl' | 'tokenUrl' | 'getUserInfo'
> = {
  providerId: 'yandex',
  authorizationUrl: 'https://oauth.yandex.ru/authorize',
  tokenUrl: 'https://oauth.yandex.ru/token',
  getUserInfo: async (tokens) => {
    const res = await fetch('https://login.yandex.ru/info', {
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
        'https://avatars.yandex.net/get-yapic/',
      ).href,
      emailVerified: true,
      id: userdata.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    } satisfies User;
  },
};

export const defaultAuthPlugins = [
  adminPlugin({
    ac,
    roles: {
      user,
      admin,
    },
  }),
  username(),
  openAPI({ disableDefaultReference: true }),
] satisfies BetterAuthOptions['plugins'];

export const defaultAuthOptions = {
  plugins: [...defaultAuthPlugins, genericOAuth({ config: [] })],
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
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
} satisfies BetterAuthOptions;

export type TAuth = ReturnType<typeof betterAuth<typeof defaultAuthOptions>>;
