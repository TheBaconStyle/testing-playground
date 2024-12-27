"use client";

import { Box, Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function Profile() {
  const { status, data } = useSession();

  return (
    <Box p={2}>
      {status === "unauthenticated" && (
        <>
          <Button variant="contained" onClick={() => signIn()}>
            Sign in
          </Button>
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
            <Button variant="contained" onClick={() => signOut()}>
              SignOut
            </Button>
          </div>
        </>
      )}
    </Box>
  );
}
