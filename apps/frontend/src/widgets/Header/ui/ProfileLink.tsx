'use client';
import { Person } from '@mui/icons-material';
import { Avatar, Button, Typography } from '@mui/material';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

export function ProfileLink() {
  const session = useSession();
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
        <Button
          tabIndex={0}
          LinkComponent={Link}
          href="/profile"
          sx={{
            gap: 1,
            flexDirection: 'row',
            alignItems: 'center',
            color: 'inherit',
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
      )}
    </>
  );
}
