'use client';

import { useAuth } from '@/features/auth/ui';
import Person from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Button, Menu, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from '@/features/auth/api';
import { useRouter } from 'next/navigation';

export function UserAuth() {
  const { user } = useAuth();

  const router = useRouter();

  const menuAnchor = useRef<HTMLButtonElement>(null);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuItemClick = useCallback((action?: () => void) => {
    action?.();
    setMenuOpen(false);
  }, []);

  return (
    <>
      {!user && (
        <Button
          variant="outlined"
          sx={{ color: 'inherit', borderColor: 'inherit' }}
          LinkComponent={Link}
          href="/auth/signin"
        >
          Войти
        </Button>
      )}
      {user && (
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
            {user?.image && <Avatar src={user?.image} />}
            {!user?.image && (
              <Avatar>
                <Person />
              </Avatar>
            )}
            <Typography variant="body1">{user?.name ?? 'user'}</Typography>
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
              onClick={() =>
                handleMenuItemClick(() =>
                  signOut().then(() => router.refresh()),
                )
              }
            >
              <LogoutIcon /> Выход
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
}
