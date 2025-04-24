'use server';
import { discord } from '@/features/auth/lib/discord';
import { generateState } from 'arctic';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function discordSignIn(callbackUrl: string) {
  const state = generateState();

  const scopes = ['email', 'identify'];

  if (callbackUrl) {
    const cookiesStore = await cookies();

    cookiesStore.set('example-callback', callbackUrl, {
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 10,
    });
  }

  const url = discord.provider.createAuthorizationURL(state, null, scopes);

  return redirect(url.toString());
}
