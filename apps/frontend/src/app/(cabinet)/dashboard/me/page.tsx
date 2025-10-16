import { apiAuthClient } from '@/features/auth/api/auth';
import { EditProfille } from '@/features/profile/ui/EditProfile';
import { BreadCrumbs } from '@/widgets/Breadcrumbs/ui/BreadCrumbs';
import { Box, Typography } from '@mui/material';
import { headers } from 'next/headers';

export default async function ProtectedPage() {
  const headersStore = await headers();

  const { data } = await apiAuthClient.getSession({
    fetchOptions: { headers: headersStore },
  });

  return (
    <Box pt={2}>
      <BreadCrumbs auto localization={{ '/dashboard': 'Панель управления' }} />
      <Typography>{data && JSON.stringify(data.user)}</Typography>
      <EditProfille />
    </Box>
  );
}
