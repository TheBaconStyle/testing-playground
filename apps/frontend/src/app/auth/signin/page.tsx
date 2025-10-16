'use client';

import { reactAuthCLient } from '@/features/auth/api/react';
import { env } from '@/shared/env';
import { Icon } from '@iconify/react';
import {
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MuiLink from '@mui/material/Link';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import z from 'zod';

const signInSchema = z.object({
  email: z.string().email('Неверный адрес эл. почты'),
  password: z.string().nonempty('Пароль не может быть пустым'),
});

export default function SignInPage() {
  const searchParams = useSearchParams();

  const callback = searchParams.get('callbackURL');

  const callbackUrl = new URL(callback ?? '', env.NEXT_PUBLIC_DOMAIN);

  const form = useForm({
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    validators: {
      onDynamic({ value }) {
        const validationResult = signInSchema.safeParse(value);

        if (!validationResult.success) {
          return {
            fields: validationResult.error.flatten((e) => {
              const { message } = e;
              return { message };
            }).fieldErrors,
          };
        }
      },
    },
    defaultValues: {
      email: '',
      password: '',
    },
    async onSubmit({ value }) {
      const signInResult = await reactAuthCLient.signIn.email({
        email: value.email,
        password: value.password,
        callbackURL: callbackUrl.href,
      });

      if (signInResult.error) {
        form.setErrorMap({
          onDynamic: {
            form: [
              {
                message: 'Ошибка',
              },
            ],
          },
        });
      }
    },
  });

  return (
    <Stack
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      gap={4}
      margin="auto"
      width={600}
    >
      <Typography variant="h5">Вход в систему</Typography>

      <form.Field name="email">
        {(field) => (
          <TextField
            label="Адрес эл. почты"
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            value={field.state.value}
            error={!!field.state.meta.errorMap.onDynamic?.length}
            helperText={
              <Stack component={'span'}>
                {field.state.meta.errorMap.onDynamic?.map((err) => (
                  <React.Fragment key={err.message}>
                    <Typography component="span">{err.message}</Typography>
                  </React.Fragment>
                ))}
              </Stack>
            }
          />
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <TextField
            label="Пароль"
            type="password"
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            value={field.state.value}
            error={!!field.state.meta.errorMap.onDynamic?.length}
            helperText={
              <Stack component={'span'}>
                {field.state.meta.errorMap.onDynamic?.map((err) => (
                  <React.Fragment key={err.message}>
                    <Typography component="span">{err.message}</Typography>
                  </React.Fragment>
                ))}
              </Stack>
            }
          />
        )}
      </form.Field>

      <form.Subscribe
        selector={(form) => [form.canSubmit, form.isSubmitting] as const}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit && !isSubmitting}
            variant="contained"
          >
            Войти
          </Button>
        )}
      </form.Subscribe>

      <Typography textAlign="center">
        Нет учетной записи?{' '}
        <MuiLink component={Link} href={'/auth/signup'}>
          Зарегистрировать
        </MuiLink>
      </Typography>

      <Divider variant="middle">или</Divider>

      <Stack direction="row" justifyContent="center" gap={4}>
        <IconButton
          onClick={() => {
            reactAuthCLient.signIn.social({
              provider: 'yandex',
              callbackURL: callbackUrl.href,
            });
          }}
        >
          <Icon icon="la:yandex" width="32" height="32" />
        </IconButton>
        <IconButton
          onClick={() => {
            reactAuthCLient.signIn.social({
              provider: 'vk',
              callbackURL: callbackUrl.href,
            });
          }}
        >
          <Icon icon="uil:vk" width="32" height="32" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
