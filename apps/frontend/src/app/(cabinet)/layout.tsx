import { BreadCrumbsContainer } from '@/widgets/Breadcrumbs/ui/BreadCrumbsContainer';
import { Header } from '@/widgets/Header/ui/Header';
import { Box } from '@mui/material';
import { SideBar } from './SideBar';

export default async function GeneralLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Header>
        <BreadCrumbsContainer
          sx={{ margin: 'auto', display: { xs: 'none', md: 'block' } }}
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
