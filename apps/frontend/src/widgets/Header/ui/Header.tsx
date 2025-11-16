import { apiAuthClient } from '@/features/auth/api/server';
import { Today as TodayIcon } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { headers } from 'next/headers';
import { PropsWithChildren } from 'react';
import { ThemeSwitch } from './ThemeSwitch';
import { Link } from '@/components/Link/Link';

type THeader = PropsWithChildren;

export async function Header({ children }: THeader) {
  const headersStore = await headers();

  const authResult = await apiAuthClient.getSession({
    fetchOptions: { headers: headersStore },
  });

  return (
    <AppBar
      component="header"
      sx={{
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
            variant="h2"
          >
            <TodayIcon
              sx={{ fontSize: 'inherit', alignSelf: 'center', mr: 1 }}
            />
            Habbins
          </MuiLink>
          {children}
          {authResult.data?.user.name}
        </Stack>
        <ThemeSwitch />
      </Toolbar>
    </AppBar>
  );
}
