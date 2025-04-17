import { EmailSignIn } from '@/features/auth/ui/EmailSignIn';
import { SocialsSignIn } from '@/features/auth/ui/SocialsSignIn';
import { Divider, Stack, Typography } from '@mui/material';

export default async function SignInPage() {
  return (
    <Stack sx={{ margin: 'auto', gap: 3 }} width={600}>
      <Typography variant="h5">Вход в систему</Typography>
      <EmailSignIn />
      <Divider variant="middle">или</Divider>
      <SocialsSignIn />
    </Stack>
  );
}
