import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { checkSession } from "./actions/auth";

const publicPaths = ["/auth/signout", "/"];
const guestPaths = ["/auth/signup", "/auth/signin"];

const defaultRedirect = "/";

export const middleware = async (request: NextRequest) => {
  const sessionToken = request.cookies.get("example-session");

  let isAuthorized = false;

  if (sessionToken && sessionToken.value) {
    const authRes = await checkSession();

    if (authRes.success) {
      isAuthorized = authRes.data;
    }
  }

  const requestUrl = request.nextUrl.clone();

  const isPublicPath = publicPaths.includes(requestUrl.pathname);

  const isGuestPath = guestPaths.includes(requestUrl.pathname);

  if (isAuthorized && isGuestPath) {
    const redirectUrl = requestUrl.clone();

    requestUrl.pathname = defaultRedirect;

    return NextResponse.redirect(redirectUrl, { headers: request.headers });
  }

  if (!isGuestPath && !isPublicPath && !isAuthorized) {
    const signInUrl = requestUrl.clone();

    signInUrl.pathname = "/auth/signin";

    return NextResponse.redirect(signInUrl, { headers: request.headers });
  }

  return NextResponse.next({ request });
};

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
