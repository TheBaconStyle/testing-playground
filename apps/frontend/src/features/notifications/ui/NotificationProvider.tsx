"use client";

import { SnackbarProvider } from "notistack";
import type { PropsWithChildren } from "react";

export function NotificationProvider({ children }: PropsWithChildren) {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      {children}
    </SnackbarProvider>
  );
}
