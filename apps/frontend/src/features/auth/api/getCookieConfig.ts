'use server';

import { cookiePrefix } from 'shared/config';

export async function getCookieConfig() {
  return cookiePrefix;
}
