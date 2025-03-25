'use server';

import { db } from 'db';
import { cookies } from 'next/headers';

export async function checkSession() {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get('example-session');

  if (!sessionToken?.value) {
    return { success: false as const, message: 'Session does not exist' };
  }

  const session = await db.query.sessions.findFirst({
    where: (ses, { eq }) => eq(ses.sessionToken, sessionToken.value),
  });

  if (!session) {
    return { success: false as const, message: 'Session does not exist' };
  }

  return { success: true as const };
}
