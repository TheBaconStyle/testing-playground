'use client';

import { reactAuthCLient } from '@/features/auth/api/react';
import { muiToast } from '@/features/notifications/lib/notify';
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
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import z from 'zod';

const signUpSchema = z
  .object({
    email: z.string().email('Неверный адрес эл. почты'),
    password: z
      .string()
      .min(8, 'Пароль должен быть длинной не менее 8')
      .regex(/[/a-zа-я/]/, 'Пароль обязан содержать строчные буквы')
      .regex(/[A-Z,А-Я]/, 'Пароль обязан содержать заглавные буквы')
      .regex(/[0-9]/, 'Пароль обязан содержать цифры')
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        'Пароль обязан содержать в себе спец-символы',
      ),
    name: z.string().nonempty('Имя не должно быть пустым'),
    confirm: z.string(),
  })
  .refine((value) => value.password === value.confirm, {
    message: 'Пароли не совпадают',
    path: ['confirm'],
  });

export default function SignUpPage() {
  const searchParams = useSearchParams();

  const callback = searchParams.get('callbackURL');

  const callbackUrl = new URL(callback ?? '', env.NEXT_PUBLIC_DOMAIN);

  const router = useRouter();

  const form = useForm({
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    validators: {
      onDynamic({ value }) {
        const validationResult = signUpSchema.safeParse(value);

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
      name: '',
      confirm: '',
    },
    async onSubmit({ value }) {
      const { confirm, ...registerData } = value;

      const signUpResult = await muiToast.promise(
        reactAuthCLient.signUp.email({
          ...registerData,
          callbackURL: callbackUrl.href,
        }),
        {
          duration: Infinity,
          loading: {
            message: 'Загрузка',
          },
          success: (result) => {
            if (result.error) {
              let message = 'Ошибка регистрации';
              if (result.error.code?.includes('USER_ALREADY_EXISTS'))
                message =
                  'Этот адрес эл. почты уже привязан к другой учетной записи';
              return {
                message,
                color: 'error',
                onCloseAction(id) {
                  console.log(id);
                },
              };
            }
            return {
              color: 'success',
              message: `Сообщение с отправлено на адрес ${result.data?.user.email}`,
              onCloseAction(id) {
                console.log(id);
              },
            };
          },
          error: (error) => {
            let message = 'Неизвестная ошибка';

            if (error instanceof Error) {
              message = error.message;
            }

            return {
              message,
              onCloseAction(id) {
                console.log(id);
              },
            };
          },
        },
      );

      if (!signUpResult.error) {
        router.push('/auth/signup/complete');
      }
    },
  });

  return (
    <Stack
      component="form"
      gap={4}
      margin="auto"
      width={600}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Typography variant="h5">Регистрация</Typography>

      <form.Field name="name">
        {(field) => (
          <TextField
            label="Имя"
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

      <form.Field name="confirm">
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
            Зарегистрироваться
          </Button>
        )}
      </form.Subscribe>

      <Typography textAlign="center">
        Уже есть учетная запись?{' '}
        <MuiLink component={Link} href={'/auth/signin'}>
          Войти
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
