import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from 'next/server';
import { apiAuthClient } from './features/auth/api/auth';
import { buildHostUrl, pathTest } from './shared/url/lib';

const publicPaths = ['/', '/assets/*'];

const guestPaths = ['/auth/*'];

export async function middleware(request: NextRequest) {
  const requestUrl = buildHostUrl(request);

  const isPublicPath = pathTest(publicPaths, requestUrl.href);

  const isGuestPath = pathTest(guestPaths, requestUrl.href);

  if (isPublicPath) {
    return NextResponse.next({ request });
  }

  const result = await apiAuthClient.getSession({
    fetchOptions: {
      headers: request.headers,
      next: {
        tags: ['authorization']
      }
    }
  })

  const isAuthenticated = !!result.data?.user;

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
