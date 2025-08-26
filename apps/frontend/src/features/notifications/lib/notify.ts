import { TrueOmit } from '@/shared/types/omit';
import { TNotification } from '../ui/Notification';
import { toast } from 'sonner';

// toast.promise(new Promise(()=>'qwe'), {loading: })

// export type T = {}

// export const notify = ({}: TrueOmit<TNotification, 'id'>, id) => {
//   return toast.custom(()=>{})
// }

export const notifyLoading = () => {}

export const notifySuccess = () => {}

export const notifyError = () => {}