'use server';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export async function getCookie(key: string) {
  const cookiesStore = await cookies();
  return cookiesStore.get(key)?.value;
}

export async function setCookie(
  key: string,
  value: string,
  options?: Partial<ResponseCookie>,
) {
  const cookiesStore = await cookies();
  return cookiesStore.set(key, value, options);
}
