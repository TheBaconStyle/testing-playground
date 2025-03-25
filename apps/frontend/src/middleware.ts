import { pathTest } from '@/shared/lib/url';
import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from 'next/server';

const publicPaths = ['/', '/auth/*', '/assets/*'];

export const middleware = async (request: NextRequest) => {
  const requestUrl = request.nextUrl.clone();

  const isPublicPath = await pathTest(publicPaths, requestUrl.href);

  const sessionToken = request.cookies.get('example-session');

  if (!isPublicPath && !sessionToken?.value) {
    const redirectUrl = requestUrl.clone();

    redirectUrl.searchParams.set('callbackUrl', redirectUrl.href);

    redirectUrl.pathname = '/api/session';

    return NextResponse.redirect(redirectUrl, { headers: request.headers });
  }

  return NextResponse.next({ request });
};

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
