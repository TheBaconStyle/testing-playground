"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";
import { PropsWithChildren } from "react";
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
