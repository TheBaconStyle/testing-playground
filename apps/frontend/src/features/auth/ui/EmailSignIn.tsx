'use client';

import { useAppForm } from '@/shared/forms/lib';
import { Button, Stack } from '@mui/material';
import { formOptions } from '@tanstack/react-form';
import { z } from 'zod';
import { emailSignIn } from '../api/email';
import { useSearchParams } from 'next/navigation';

const emailSignInSchema = z.object({
  email: z.string().email('Неверный формат адреса эл. почты'),
});

const emailSignInOptions = formOptions({
  defaultValues: {
    email: '',
  },
  validators: {
    onSubmit: emailSignInSchema,
  },
});

export function EmailSignIn() {
  const searchParams = useSearchParams();

  const form = useAppForm({
    ...emailSignInOptions,
    onSubmit: async ({ value }) => {
      await emailSignIn(value.email, searchParams.toString());
    },
  });

  return (
    <Stack
      component="form"
      gap={2}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppField name="email">
        {({ TextField, handleChange, handleBlur, state }) => {
          return (
            <TextField
              label="Адрес эл. почты"
              onChange={(e) => handleChange(e.target.value)}
              value={state.value}
              onBlur={handleBlur}
              error={state.meta.errors.length > 0}
              helperText={state.meta.errors
                .map((e: any) => e.message)
                .join(' ')}
            />
          );
        }}
      </form.AppField>
      <Button type="submit" variant="contained">
        войти с адресом эл. почты
      </Button>
    </Stack>
  );
}
