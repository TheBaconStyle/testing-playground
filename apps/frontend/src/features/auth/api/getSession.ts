'use server';
import { headers } from 'next/headers';
import { auth } from 'shared/auth/auth';

export async function getSession() {
  const actionHeaders = await headers();
  return auth.api.getSession({ headers: actionHeaders });
}
