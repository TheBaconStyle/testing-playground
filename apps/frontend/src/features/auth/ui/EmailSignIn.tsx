'use client';

import { Stack, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

export function EmailSignIn() {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: '',
    },
  });

  return (
    <Stack
      component="form"
      gap={2}
      onSubmit={handleSubmit(
        (data) => signIn('nodemailer', { email: data.email }),
        (error) => console.log(error),
      )}
    >
      <TextField {...register('email')} label="Адрес эл. почты" />
      <Button type="submit" variant="contained">
        войти с адресом эл. почты
      </Button>
    </Stack>
  );
}
