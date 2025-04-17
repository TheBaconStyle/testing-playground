import { buildHostUrl } from '@/shared/url/lib';
import { generateCodeVerifier, generateState } from 'arctic';
import { createS256CodeChallenge } from 'arctic/dist/oauth2';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const state = generateState();

  const codeVerifier = await generateCodeVerifier();

  const scopes = ['email'];

  const redirectUrl = buildHostUrl(request);

  redirectUrl.pathname = '/api/auth/signin/vk/callback';

  const callbackUrl = redirectUrl.searchParams.get('callbackUrl');

  const cookiesStore = await cookies();

  cookiesStore.set('example-state', state, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 10,
  });

  cookiesStore.set('example-verifier', codeVerifier, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 10,
  });

  if (callbackUrl) {
    cookiesStore.set('example-callback', callbackUrl, {
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 10,
    });
  }

  const url = new URL('https://id.vk.com/authorize');

  const codeChallenge = await createS256CodeChallenge(codeVerifier);

  url.searchParams.set('response_type', 'code');

  url.searchParams.set('client_id', process.env.AUTH_VK_ID!);

  url.searchParams.set('scope', scopes.join(' '));

  url.searchParams.set('redirect_uri', redirectUrl.href);

  url.searchParams.set('state', state);

  url.searchParams.set('code_challenge', codeChallenge);

  url.searchParams.set('code_challenge_method', 'S256');

  return NextResponse.redirect(url.toString());
}
