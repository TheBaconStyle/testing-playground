import { IConnection } from 'sdk';
import { env } from '@/shared/env';

export function createSDKConnection(options: RequestInit) {
  const headers = new Map<string | number, IConnection.HeaderValue>();

  if (typeof options.headers?.entries === 'function') {
    for (const [key, value] of options.headers.entries()) {
      headers.set(key, value);
    }
  }

  return {
    host: env.API_URL,
    options,
    headers: Object.fromEntries(headers.entries()),
    fetch
  } satisfies IConnection;
}
