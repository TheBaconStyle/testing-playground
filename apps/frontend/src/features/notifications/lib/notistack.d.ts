import type { AlertColor, AlertProps } from '@mui/material';
import type { TSimpleNotification } from '../ui/SimpleNotification';
import { ReactNode } from 'react';
import { TComplexNotification } from '../ui/ComplexNotification';

declare module 'notistack' {
  interface VariantOverrides {
    // removes the `warning` variant
    default: false;
    warning: false;
    success: false;
    error: false;
    info: false;
    simple: TSimpleNotification;
    complex: TComplexNotification;
  }
}
