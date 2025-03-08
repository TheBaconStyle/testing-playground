"use client";
import { Button, Icon, Stack } from "@mui/material";
import * as VkID from "@vkid/sdk";
import { Auth, Config } from "@vkid/sdk";
import { signIn } from "next-auth/react";
import { SiDiscord, SiVk } from "react-icons/si";

export function SocialsSignIn() {
  return (
    <Stack gap={2}>
      <Button variant="contained" onClick={() => signIn("discord")}>
        Войти через <Icon component={SiDiscord} sx={{ ml: 2 }} />
      </Button>
    </Stack>
  );
}
