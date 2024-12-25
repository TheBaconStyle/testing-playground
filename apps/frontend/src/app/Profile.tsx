"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function Profile() {
  const { status, data } = useSession();

  return (
    <div>
      {status === "unauthenticated" && (
        <>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {status === "authenticated" && (
        <>
          <div>
            {data ? `logged in as ${data.user?.name}` : "not logged in"}
          </div>

          <div>
            {data?.user?.image ? (
              <Image
                src={data?.user?.image}
                alt={`${data.user.name}'s avatar`}
                width={128}
                height={128}
              />
            ) : (
              "No image provided"
            )}
          </div>

          <div>
            <button onClick={() => signOut()}>SignOut</button>
          </div>
        </>
      )}
    </div>
  );
}
