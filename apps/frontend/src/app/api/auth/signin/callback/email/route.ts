import { registerSession } from '@/features/auth/lib/session';
import { applyEmailVerificationToken } from '@/shared/email/lib/email';
import { buildHostUrl } from '@/shared/url/lib';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const hostUrl = buildHostUrl(req);

  const magicLinkToken = hostUrl.searchParams.get('token');

  if (!magicLinkToken)
    return NextResponse.json(
      { error: 'No magic link token', status: 400 },
      { status: 400 },
    );

  const verificationToken = await applyEmailVerificationToken(magicLinkToken);

  if (!verificationToken) {
    return NextResponse.json(
      { error: 'Invalid magic link token', status: 400 },
      { status: 400 },
    );
  }

  const session = await registerSession(verificationToken.user.id);

  const cookiesStore = await cookies();

  cookiesStore.set('example-session', session.sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  hostUrl.search = '';

  hostUrl.pathname = '/dashboard';

  const callbackUrl = req.cookies.get('example-callback')?.value;

  if (callbackUrl) {
    req.cookies.delete('example-callback');

    hostUrl.href = callbackUrl;
  }

  return NextResponse.redirect(hostUrl, { headers: req.headers });
}
