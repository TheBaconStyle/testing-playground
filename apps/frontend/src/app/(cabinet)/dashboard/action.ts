'use server';

import { createSDKConnection } from '@/features/sdk/api/connection';
import { createAuthHeaders } from '@/features/sdk/lib/createAuthHeaders';
import { functional, HttpError } from 'sdk';
import {RRule} from 'rrule'

export async function action() {
  const authHeaders = await createAuthHeaders();

  const connection = createSDKConnection({ headers: authHeaders });

  const result = await functional.api.v1.habits
    .create(connection, {
      name: 'Test',
      description: 'Test',
      reminderRule: new RRule({
        tzid: 'Europe/Kaliningrad',
      }).toString(),
      icon: 'qwe'
    })
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
