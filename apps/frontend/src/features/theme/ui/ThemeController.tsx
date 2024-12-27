"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { setTheme } from "@/features/theme/api/theme";

export type TThemeController = {
  currentTheme?: string;
};

export function ThemeController({ currentTheme }: TThemeController) {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const setResolvedTheme = async () => {
      if (
        resolvedTheme &&
        resolvedTheme !== "system" &&
        resolvedTheme !== currentTheme
      )
        setTheme(resolvedTheme);
    };
    setResolvedTheme();
  }, [resolvedTheme, currentTheme]);

  return null;
}
