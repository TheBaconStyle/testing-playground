import { auth } from '@/features/auth/model';
import { getTheme } from '@/features/theme/api';
import { Person } from '@mui/icons-material';
import TodayIcon from '@mui/icons-material/Today';
import { Avatar, Button, Typography } from '@mui/material';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { ThemeSwitch } from './ThemeSwitch';

type THeader = PropsWithChildren<AppBarProps>;

export async function Header({ children, ...appBarProps }: THeader) {
  const currentTheme = await getTheme();

  const session = await auth();

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
        </Stack>
        <ThemeSwitch currentTheme={currentTheme} />

        {session && (
          <Button
            LinkComponent={Link}
            href="/dashboard"
            sx={{
              gap: 1,
              flexDirection: 'row',
              alignItems: 'center',
              color: 'inherit',
            }}
          >
            {session.user?.image && <Avatar src={session.user?.image} />}
            {!session.user?.image && (
              <Avatar>
                <Person />
              </Avatar>
            )}
            <Typography variant="body1">
              {session.user?.name ?? 'user'}
            </Typography>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
