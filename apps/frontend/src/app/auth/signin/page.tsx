import { auth } from '@/features/auth/model';
import { EmailSignIn } from '@/features/auth/ui/EmailSignIn';
import { SocialsSignIn } from '@/features/auth/ui/SocialsSignIn';
import { Divider, Stack, Typography } from '@mui/material';
import { redirect } from 'next/navigation';

export default async function SignInPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await auth();

  const searchParams = await props.searchParams;

  if (session) {
    const callbackUrl = searchParams.callbackUrl ?? '/';
    return redirect(callbackUrl);
  }

  return (
    <Stack sx={{ margin: 'auto', gap: 3 }} width={600}>
      <Typography variant="h5">Вход в систему</Typography>
      <EmailSignIn />
      <Divider variant="middle">или</Divider>
      <SocialsSignIn />
    </Stack>
  );
}
