import { buildHostUrl, pathTest } from '@/shared/url/lib/url';
import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from 'next/server';
import { createClient } from '@/shared/sdk/api/backend';

const publicPaths = ['/', '/auth/*', '/assets/*'];

const authClient = createClient(['auth']);

export async function middleware(request: NextRequest) {
  const requestUrl = buildHostUrl(request);

  const isPublicPath = pathTest(publicPaths, requestUrl.href);

  if (isPublicPath) {
    return NextResponse.next({ request });
  }

  const redirectUrl = requestUrl.clone();

  const sessionToken = request.cookies.get('example-session')?.value;

  const callbackParam = redirectUrl.searchParams.get('callbackUrl');

  redirectUrl.search = '';

  redirectUrl.pathname = 'auth/signin';

  const callbackUrl = redirectUrl.clone();

  callbackUrl.pathname = requestUrl.pathname;

  if (callbackParam) {
    callbackUrl.href = callbackParam;
  }

  redirectUrl.searchParams.set('callbackUrl', callbackUrl.href);

  if (!sessionToken) {
    return NextResponse.redirect(redirectUrl, { headers: request.headers });
  }

  const { isAuthorized } = await authClient.auth.authorize.query({
    token: sessionToken,
  });

  if (!isAuthorized) {
    return NextResponse.redirect(redirectUrl, { headers: request.headers });
  }

  return NextResponse.next({ request });
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|_error).*)',
  ],
};
