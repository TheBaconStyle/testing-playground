'use server';

import { cookiePrefix } from 'shared/auth/config';

export async function getCookieConfig() {
  return cookiePrefix;
}
