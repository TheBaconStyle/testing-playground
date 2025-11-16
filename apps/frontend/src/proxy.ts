import { getSessionCookie } from 'better-auth/cookies';
import { MiddlewareConfig, type NextRequest, NextResponse } from 'next/server';
import { buildHostUrl, pathTest } from './shared/url/lib';
import { cookiePrefix } from 'shared/auth/config';

const publicPaths = ['/', '/assets/*'];

const guestPaths = ['/auth/*'];

export async function proxy(request: NextRequest) {
  const requestUrl = buildHostUrl(request);

  const isPublicPath = pathTest(publicPaths, requestUrl.href);

  const isGuestPath = pathTest(guestPaths, requestUrl.href);

  if (isPublicPath) {
    return NextResponse.next({ request });
  }

  const sessionCookie = await getSessionCookie(request.headers, {
    cookiePrefix,
  });

  const isAuthenticated = !!sessionCookie;

  if (isGuestPath && isAuthenticated) {
    const redirectUrl = new URL('/', requestUrl);

    return NextResponse.redirect(redirectUrl, request);
  }

  if (!isPublicPath && !isGuestPath && !isAuthenticated) {
    const redirectUrl = new URL('/auth/signin', requestUrl);

    redirectUrl.searchParams.set('callbackURL', requestUrl.pathname);

    return NextResponse.redirect(redirectUrl, request);
  }

  return NextResponse.next({ request });
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|_error).*)',
  ],
};
