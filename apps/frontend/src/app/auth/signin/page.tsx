'use client';

import { reactAuthCLient } from '@/features/auth/api/react';
import { Alert, Button, Divider, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function SignInPage() {
  const searchParams = useSearchParams();

  const callback = searchParams.get('callbackURL');

  const callbackUrl = new URL(callback ?? '', process.env.NEXT_PUBLIC_DOMAIN!);

  return (
    <Stack sx={{ margin: 'auto', gap: 3 }} width={600}>
      <Typography variant="h5">Вход в систему</Typography>
      <Button
        onClick={() => {
          reactAuthCLient.signIn.social({
            provider: 'yandex',
            callbackURL: callbackUrl.href,
          });
        }}
      >
        SignIn
      </Button>

      <Divider variant="middle">или</Divider>
    </Stack>
  );
}
