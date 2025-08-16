import { createAuthClient as createApiClient } from 'better-auth/client';
import {
  adminClient,
  genericOAuthClient,
  usernameClient,
} from 'better-auth/client/plugins';
import { adminConfig } from 'shared/admin';

export const apiAuthClient = createApiClient({
  baseURL: 'http://localhost:5000',
  plugins: [adminClient(adminConfig), usernameClient(), genericOAuthClient()],
})
