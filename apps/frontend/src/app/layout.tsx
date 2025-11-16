import { getTheme } from '@/features/theme/api';
import MuiThemeProvider from '@/features/theme/ui/MuiThemeProvider';
import { Box } from '@mui/material';
import { Toaster } from 'sonner';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning={true}
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
        <MuiThemeProvider>
          {children}
          <Toaster toastOptions={{ unstyled: true }} />
        </MuiThemeProvider>
      </Box>
    </html>
  );
}
