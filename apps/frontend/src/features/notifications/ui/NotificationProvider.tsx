'use client';

import { SnackbarProvider, type SnackbarProviderProps } from 'notistack';
import { ComplexNotification } from './ComplexNotification';
import { SimpleNotification } from './SimpleNotification';

export function NotificationProvider(props: SnackbarProviderProps) {
  return (
    <SnackbarProvider
      {...props}
      Components={{ simple: SimpleNotification, complex: ComplexNotification }}
    />
  );
}
