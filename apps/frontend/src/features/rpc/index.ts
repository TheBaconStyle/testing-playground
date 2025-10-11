import { TApp } from 'backend';
import { hc } from 'hono/client';

export const rpcClient = hc<TApp>(process.env.API_URL!);
