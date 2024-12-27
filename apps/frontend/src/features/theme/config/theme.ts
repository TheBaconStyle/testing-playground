"use client";

import { Roboto } from "next/font/google";

const RobotoFont = Roboto({
  weight: ["300", "500", "700"],
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  style: ["italic", "normal"],
});

export const themeFont = {
  typography: { fontSize: 16, fontFamily: RobotoFont.style.fontFamily },
};
