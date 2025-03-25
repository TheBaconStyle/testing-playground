import { getTheme } from '@/features/theme/api';
import { ThemeSwitch } from '@/widgets/Header/ui/ThemeSwitch';
import { Box, Grid2 as Grid, Paper } from '@mui/material';
import Image from 'next/image';
import type { PropsWithChildren } from 'react';

export default async function AuthLayout({ children }: PropsWithChildren) {
  const theme = await getTheme();
  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Grid
        size={{ xs: 0, md: 6 }}
        sx={{ display: { xs: 'none', md: 'block', position: 'relative' } }}
        container
        flexDirection="column"
      >
        <Image
          src={'https://www.baconcs.duckdns.org/assets/cheggy.png'}
          alt="qwe"
          fill
          quality={100}
        />
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        container
        flexDirection="column"
        component={Paper}
        sx={{ position: 'relative' }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <ThemeSwitch currentTheme={theme} />{' '}
        </Box>
        {children}
      </Grid>
    </Grid>
  );
}
