import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from 'next/server';
import { pathTest } from '@/shared/lib/url';

const publicPaths = ['/', '/auth/*'];

export const middleware = async (request: NextRequest) => {
  const requestUrl = request.nextUrl.clone();

  const isPublicPath = await pathTest(publicPaths, requestUrl.href);

  const sessionToken = request.cookies.get('example-session');

  if (!isPublicPath && !sessionToken?.value) {
    const sessionUrl = requestUrl.clone();

    sessionUrl.pathname = '/api/session';

    sessionUrl.searchParams.set('callbackUrl', sessionUrl.href);

    return NextResponse.redirect(sessionUrl, { headers: request.headers });
  }

  return NextResponse.next({ request });
};

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
