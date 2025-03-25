import { db } from 'db';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get('sessionToken');

  const redirectUrl = req.nextUrl.clone();

  const callbackParam = req.nextUrl.searchParams.get('callbackUrl');

  console.log(callbackParam);

  if (sessionToken?.value) {
    const session = await db.query.sessions.findFirst({
      where: (ses, { eq, and, gt }) =>
        and(
          eq(ses.sessionToken, sessionToken.value),
          gt(ses.expires, new Date()),
        ),
    });

    if (session && callbackParam) {
      redirectUrl.href = callbackParam;
    }
  }

  for (const k of Array.from(redirectUrl.searchParams.keys())) {
    redirectUrl.searchParams.delete(k);
  }

  redirectUrl.pathname = 'auth/signin';

  const callbackUrl = req.nextUrl.clone();

  callbackUrl.pathname = '/';

  if (callbackParam) {
    callbackUrl.href = callbackParam;
  }

  redirectUrl.searchParams.set('callbackUrl', callbackUrl.href);

  return NextResponse.redirect(redirectUrl.href, { headers: req.headers });
}
