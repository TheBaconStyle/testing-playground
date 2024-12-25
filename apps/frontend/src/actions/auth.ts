"use server";

import { defaultConfig } from "@/config/api";
import { cookies } from "next/headers";
import { api } from "sdk/lib/functional";

export async function checkSession(): Promise<
  { success: true; data: boolean } | { success: false; message: string }
> {
  const cookieStore = cookies();

  const sessionToken = await cookieStore.get("example-session");

  if (!sessionToken || !sessionToken.value) {
    return { success: false, message: "Session does not exist" };
  }

  const res = await api.v1.auth
    .authorize(defaultConfig, {
      sessionToken: sessionToken.value,
    })
    .catch(() => null);

  if (!res) {
    return { success: false, message: "Smth went wrong" };
  }

  if (!res.success) {
    return { success: false, message: String(res.data) };
  }

  const { data } = res;

  return { success: true, data };
}
