import { BreadCrumbs } from '@/widgets/Breadcrumbs/ui/BreadCrumbs';
import { Box } from '@mui/material';
import { Metadata } from 'next';
import { Test } from './Test';

export const metadata: Metadata = {
  title: 'Habbins — Панель управления',
};

export default function DashboardPage() {
  return (
    <>
      <BreadCrumbs auto localization={{ '/dashboard': 'Панель управления' }} />
      <Box>Dashboard page</Box>
      <Test />
    </>
  );
}
