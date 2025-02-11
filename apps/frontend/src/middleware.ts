import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicPaths = ["/auth/signout", "/", "/auth/signin", "/auth/verify"];

export const middleware = async (request: NextRequest) => {
  const requestUrl = request.nextUrl.clone();

  const isPublicPath = publicPaths.includes(requestUrl.pathname);

  const sessionToken = request.cookies.get("example-session");

  if (!isPublicPath && !sessionToken) {
    const sessionUrl = requestUrl.clone();

    sessionUrl.pathname = `/api/session`;

    sessionUrl.searchParams.set("callbackUrl", sessionUrl.href);

    return NextResponse.redirect(sessionUrl, { headers: request.headers });
  }

  return NextResponse.next({ request });
};

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
