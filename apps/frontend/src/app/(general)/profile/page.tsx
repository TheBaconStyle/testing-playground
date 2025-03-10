import { EditProfille } from '@/features/profile/ui/EditProfile';
import CrumbLabel from '@/widgets/Breadcrumbs/ui/СrumbLabel';
import { Box } from '@mui/material';

export default async function ProtectedPage() {
  return (
    <Box pt={2}>
      <CrumbLabel href="/profile" label="Профиль" />

      <EditProfille />
    </Box>
  );
}
