'use server';

import { cookies } from 'next/headers';

export async function setTheme(theme: string) {
  const userCookies = await cookies();
  userCookies.set('app-theme', theme);
}

export async function getTheme() {
  const reqCookies = await cookies();

  return (reqCookies.get('app-theme')?.value ?? 'light') as 'light' | 'dark';
}
