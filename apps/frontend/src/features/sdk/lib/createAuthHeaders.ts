import { cookies } from 'next/headers';

export async function createAuthHeaders(headers?: Headers) {
  const cookiesStore = await cookies();

  const requestHeaders = headers ?? new Headers();

  requestHeaders.set('cookie', cookiesStore.toString());

  return requestHeaders;
}


