'use client';

import { Person } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback, useRef, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

export function UserAuth() {
  const session = useSession();

  const menuAnchor = useRef<HTMLButtonElement>(null);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuItemClick = useCallback((action?: () => void) => {
    action?.();
    setMenuOpen(false);
  }, []);

  return (
    <>
      {!session.data && (
        <Button
          variant="outlined"
          sx={{ color: 'inherit', borderColor: 'inherit' }}
          onClick={() => signIn()}
        >
          Войти
        </Button>
      )}
      {session.data && (
        <>
          <Button
            tabIndex={0}
            ref={menuAnchor}
            sx={{
              gap: 1,
              flexDirection: 'row',
              alignItems: 'center',
              color: 'inherit',
            }}
            onClick={() => {
              setMenuOpen(!isMenuOpen);
            }}
          >
            {session.data?.user?.image && (
              <Avatar src={session.data?.user?.image} />
            )}
            {!session.data.user?.image && (
              <Avatar>
                <Person />
              </Avatar>
            )}
            <Typography variant="body1">
              {session.data?.user?.name ?? 'user'}
            </Typography>
          </Button>
          <Menu
            open={isMenuOpen}
            anchorEl={menuAnchor.current}
            onClose={() => setMenuOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <MenuItem
              sx={{ gap: 1 }}
              onClick={() => handleMenuItemClick()}
              component={Link}
              href="/profile"
              type="link"
            >
              <AccountCircleIcon /> Профиль
            </MenuItem>
            <MenuItem
              sx={{ gap: 1 }}
              onClick={() => handleMenuItemClick(() => signOut())}
            >
              <LogoutIcon /> Выход
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
}
