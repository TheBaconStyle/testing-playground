"use client";

import { ThemeProvider, type ThemeProviderProps } from "next-themes";
import type { PropsWithChildren } from "react";
import { ThemeController } from "./ThemeController";

export function NextThemeProvider({
  children,
  ...props
}: PropsWithChildren<ThemeProviderProps>) {
  return (
    <ThemeProvider {...props}>
      <ThemeController />
      {children}
    </ThemeProvider>
  );
}
