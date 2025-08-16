'use client';
import { reactAuthCLient } from '@/features/auth/api/react';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const searchParams = useSearchParams();

  const callback = searchParams.get('callbackURL');

  const callbackUrl = new URL(
    callback ?? '',
    process.env.NEXT_PUBLIC_AUTH_API!,
  );

  return (
    <Stack sx={{ margin: 'auto', gap: 3 }} width={600}>
      <Typography variant="h5">Вход в систему</Typography>
      <Button
        onClick={() => {
          // authClient.signUp.email({
          //   email: 'qwe@qwe.qwe',
          //   password: 'Qw3rty123!',
          //   name: 'QwertyMaster',
          //   callbackURL: 'https://www.baconcs.duckdns.org/dashboard',
          // });
          // authClient.signIn.email({
          //   email: 'qwe@qwe.qwe',
          //   password: 'Qw3rty123!',
          //   callbackURL: callbackUrl.href,
          // });
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
