'use server';

import { createSDKConnection } from '@/features/sdk/api/connection';
import { createAuthHeaders } from '@/features/sdk/lib/createAuthHeaders';
import { functional, HttpError } from 'sdk';

export async function action() {
  const authHeaders = await createAuthHeaders();

  const connection = createSDKConnection({ headers: authHeaders });

  const result = await functional.api.v1.habits
    .newHabit(connection, { name: 'test', goal: 'test' })
    .then((res) => {
      return {
        success: true,
        data: res,
      };
    })
    .catch((e) => {
      if (e instanceof HttpError) {
        return { success: false, message: e.message };
      }

      return { success: false, message: 'Unknown error' };
    });

  return result;
}
