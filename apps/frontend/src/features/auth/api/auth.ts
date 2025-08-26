import { createAuthClient } from 'better-auth/client';
import {
  adminClient,
  genericOAuthClient,
  usernameClient,
} from 'better-auth/client/plugins';
import { ac, admin, user } from 'shared/auth/roles';

export const apiAuthClient = createAuthClient({
  baseURL: `${process.env.API_URL}`,
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
