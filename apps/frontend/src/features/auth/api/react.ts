import { genericOAuthClient, usernameClient } from 'better-auth/client/plugins';
import { createAuthClient as createReactClient } from 'better-auth/react';
import { ac, admin, user } from 'shared/auth/roles';
import { adminClient } from 'better-auth/client/plugins';
import { env } from '@/shared/env';

export const reactAuthCLient = createReactClient({
  baseURL: `${env.NEXT_PUBLIC_DOMAIN}/api/auth`,
  plugins: [
    adminClient({
      ac,
      roles: {
        user,
        admin,
      },
      defaultRole: 'user',
    }),
    usernameClient(),
    genericOAuthClient(),
  ],
});
