import { getTheme } from '@/features/theme/api';
import { Today as TodayIcon } from '@mui/icons-material';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { ThemeSwitch } from './ThemeSwitch';
import { apiAuthClient } from '@/features/auth/api/auth';

type THeader = PropsWithChildren<AppBarProps>;

export async function Header({ children, ...appBarProps }: THeader) {
  const currentTheme = await getTheme();

  const authResult = await apiAuthClient.getSession();

  return (
    <AppBar
      {...appBarProps}
      component="header"
      sx={{
        ...appBarProps.sx,
        userSelect: 'none',
        position: 'sticky',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Stack
          sx={{
            flexGrow: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            mr: 2,
          }}
        >
          <MuiLink
            component={Link}
            href="/"
            sx={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
            variant="h4"
          >
            <TodayIcon
              sx={{ fontSize: 'inherit', alignSelf: 'center', mr: 1 }}
            />
            Habbins
          </MuiLink>
          {children}
          {authResult.data?.user.name}
        </Stack>
        <ThemeSwitch currentTheme={currentTheme} />
      </Toolbar>
    </AppBar>
  );
}
