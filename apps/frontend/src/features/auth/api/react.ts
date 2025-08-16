import { genericOAuthClient, usernameClient } from 'better-auth/client/plugins';
import { createAuthClient as createReactClient } from 'better-auth/react';
import { adminConfig } from 'shared/admin';
import { adminClient } from 'better-auth/client/plugins';

export const reactAuthCLient = createReactClient({
  baseURL: 'http://localhost:5000',
  plugins: [adminClient(adminConfig), usernameClient(), genericOAuthClient()],
});