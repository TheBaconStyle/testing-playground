import { auth } from "@/features/auth/config/auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export async function AuthProvider({ children }: PropsWithChildren) {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
