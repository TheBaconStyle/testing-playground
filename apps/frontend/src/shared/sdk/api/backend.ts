import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '@/shared/sdk/lib/server';

export function createClient(tags: string[]) {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: process.env.API_URL!,
        fetch: async (input, init) =>
          fetch(input, { ...init, next: { revalidate: 5, tags } }),
      }),
    ],
  });
}
