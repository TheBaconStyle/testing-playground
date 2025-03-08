import { auth } from "@/features/auth/model/auth";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";

/**
 * AuthProvider component provides authentication context to its children components.
 *
 * @param {PropsWithChildren} props - The props object containing the children components.
 * @returns {JSX.Element} - The SessionProvider component with the session and children components.
 */
export async function AuthProvider({ children }: PropsWithChildren) {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
