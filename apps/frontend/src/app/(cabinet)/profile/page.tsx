import { apiAuthClient } from '@/features/auth/api/auth';
import { EditProfille } from '@/features/profile/ui/EditProfile';
import CrumbLabel from '@/widgets/Breadcrumbs/ui/СrumbLabel';
import { Box, Typography } from '@mui/material';
import { headers } from 'next/headers';

export default async function ProtectedPage() {
  const headersStore = await headers();

  const { data } = await apiAuthClient.getSession({
    fetchOptions: { headers: headersStore },
  });

  return (
    <Box pt={2}>
      <CrumbLabel href="/profile" label="Профиль" />
      <Typography>{data && JSON.stringify(data.user)}</Typography>
      <EditProfille />
    </Box>
  );
}
