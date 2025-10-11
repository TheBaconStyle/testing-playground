'use server'
import { rpcClient } from '@/features/rpc';

export async function Qwe() {
  
  const result = await rpcClient.api.habits.$get()
  return result.text();
}