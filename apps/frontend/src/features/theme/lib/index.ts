'use client';

import { createTheme } from '@mui/material';
import { Roboto } from 'next/font/google';

const font = Roboto({
  weight: ['300', '500', '700'],
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
  style: ['italic', 'normal'],
});

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  defaultColorScheme: 'dark',
  typography: {
    fontFamily: font.style.fontFamily,
    h1: { fontSize: 42, fontWeight: 'revert'},
    h2: { fontSize: 30, fontWeight: 'revert'},
    h3: { fontSize: 26, fontWeight: 'revert'},
    h4: { fontSize: 20, fontWeight: 'revert'},
    h5: { fontSize: 18, fontWeight: 'revert'},
    h6: { fontSize: 16, fontWeight: 'revert'},
  },
});
