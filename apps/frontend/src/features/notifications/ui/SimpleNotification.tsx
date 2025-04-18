'use client';
import { Check, Close } from '@mui/icons-material';
import { Alert, AlertColor, AlertProps, IconButton } from '@mui/material';
import { closeSnackbar } from 'notistack';
import { Ref } from 'react';

export type TSimpleNotification = {
  color?: AlertColor;
  icon?: AlertProps['icon'];
  message?: string;
  ref?: Ref<HTMLDivElement>;
  id?: string;
};

export function SimpleNotification({
  color = 'success',
  icon = <Check fontSize="inherit" />,
  message = 'success',
  ref,
  id,
}: TSimpleNotification) {
  return (
    <>
      <Alert
        icon={icon}
        severity={color}
        ref={ref}
        variant="filled"
        action={
          <IconButton onClick={() => closeSnackbar(id)} color="inherit">
            <Close fontSize="small" />
          </IconButton>
        }
        sx={{ alignItems: 'center' }}
      >
        {message}
      </Alert>
    </>
  );
}
