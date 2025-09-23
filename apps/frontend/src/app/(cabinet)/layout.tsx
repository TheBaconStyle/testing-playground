import { BreadCrumbs } from '@/widgets/Breadcrumbs/ui/BreadCrumbs';
import { Header } from '@/widgets/Header/ui/Header';
import { Box, Paper } from '@mui/material';
import type { PropsWithChildren } from 'react';
import { SideBar } from './SideBar';

export default async function GeneralLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header>
        <BreadCrumbs
          sx={{ margin: 'auto', display: { xs: 'none', md: 'block' } }}
          basePathLabel="Панель управления"
          basePath="/dashboard"
        />
      </Header>
      <Box
        component="main"
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', gap: 2 }}
      >
        <SideBar />

        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
    </>
  );
}
