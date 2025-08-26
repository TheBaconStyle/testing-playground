import { Box } from '@mui/material';
import { Toaster } from 'sonner';
import { BreadCrumbProvider } from '@/widgets/Breadcrumbs/ui/BreadCrumbProvider';
import { getTheme } from '../features/theme/api';
import { MuiThemeProvider, NextThemeProvider } from '../features/theme/ui';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userTheme = await getTheme();

  return (
    <html
      lang="ru"
      suppressHydrationWarning
      style={{ scrollBehavior: 'smooth' }}
    >
      <Box
        component="body"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <NextThemeProvider defaultTheme={userTheme}>
          <MuiThemeProvider theme={userTheme}>
            <BreadCrumbProvider>{children}</BreadCrumbProvider>
            <Toaster toastOptions={{ unstyled: true }} />
          </MuiThemeProvider>
        </NextThemeProvider>
      </Box>
    </html>
  );
}
