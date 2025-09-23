'use server';
import { headers } from 'next/headers';
import { apiAuthClient } from './auth';
1;
export async function getSession() {
  const actionHeaders = await headers();
  return apiAuthClient.getSession({ fetchOptions: { headers: actionHeaders } });
}
