import { toast } from 'sonner';
import { Notification, TNotification } from '../ui/Notification';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import { TrueOmit } from '@/shared/types/omit';
import type { ExternalToast } from 'sonner';
import { CircularProgress } from '@mui/material';

type PromiseMessages<T> = ExternalToast & {
  loading: TNotification;
  success: (data: T) => TNotification;
  error: (error: unknown) => TNotification;
};

const showMuiToast = (props: ExternalToast & TNotification) => {
  return toast.custom((id) => <Notification {...props} id={id} />, props);
};

export const muiToast = {
  success: (message: TrueOmit<TNotification, 'color' | 'icon'>) =>
    showMuiToast({
      color: 'success',
      toastIcon: <CheckCircleIcon />,
      ...message,
    }),
  error: (message: TrueOmit<TNotification, 'color' | 'icon'>) =>
    showMuiToast({ color: 'error', toastIcon: <ErrorIcon />, ...message }),
  info: (message: TrueOmit<TNotification, 'color' | 'icon'>) =>
    showMuiToast({ color: 'info', toastIcon: <InfoIcon />, ...message }),
  warning: (message: TrueOmit<TNotification, 'color' | 'icon'>) =>
    showMuiToast({ color: 'warning', toastIcon: <WarningIcon />, ...message }),
  custom: showMuiToast,
  loading: (message: TrueOmit<TNotification, 'color' | 'icon'>) =>
    showMuiToast({
      color: 'info',
      toastIcon: <CircularProgress size={24} />,
      ...message,
    }),
  promise: <T,>(promise: Promise<T>, messages: PromiseMessages<T>) => {
    const toastId = messages.id ?? crypto.randomUUID();

    const loadingProps = { id: toastId, ...messages.loading };

    muiToast.loading(loadingProps);

    promise
      .then((data) => {
        const toastData = messages.success(data);
        toastData.color;
        muiToast[toastData.color ?? 'success']({ ...toastData, id: toastId });
      })
      .catch((err) => muiToast.error({ ...messages.error(err), id: toastId }));

    return promise;
  },
};
