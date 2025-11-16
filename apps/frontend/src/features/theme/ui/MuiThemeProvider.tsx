'use client';

import { theme } from '@/features/theme/lib/index';
import {
  CssBaseline,
  InitColorSchemeScript,
  ThemeProvider,
} from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { memo, type PropsWithChildren } from 'react';

function MuiThemeProvider({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: true }}>
      <InitColorSchemeScript modeStorageKey="theme-mode" attribute="class" />
      <ThemeProvider theme={theme} modeStorageKey="theme-mode">
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default memo(MuiThemeProvider);
