import { discord } from '@/features/auth/api/discord';
import { buildHostUrl } from '@/shared/url/lib';
import { generateState } from 'arctic';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const state = generateState();

  const scopes = ['email', 'identify'];

  const requestUrl = buildHostUrl(request);

  const callbackUrl = requestUrl.searchParams.get('callbackUrl');

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

  return NextResponse.redirect(url.toString());
}
