import { BreadCrumbs } from '@/widgets/Breadcrumbs/ui/BreadCrumbs';
import { Header } from '@/widgets/Header/ui/Header';
import { NestedListItemButton } from '@/widgets/NestedList/ui/NestedListItem';
import { Dashboard } from '@mui/icons-material';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import type { PropsWithChildren } from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import Link from 'next/link';
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
        <Paper>
          <NestedListItemButton text="Основное" icon={<AppsIcon />}>
            <List>
              <ListItemButton LinkComponent={Link} href="/dashboard">
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText>Панель управления</ListItemText>
              </ListItemButton>
              <ListItemButton LinkComponent={Link} href="/profile">
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText>Профиль</ListItemText>
              </ListItemButton>
            </List>
          </NestedListItemButton>
          <NestedListItemButton text="Привычки" icon={<AppsIcon />}>
            <List>
              <ListItemButton LinkComponent={Link} href="/habits">
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText>Все привычки</ListItemText>
              </ListItemButton>
              <ListItemButton LinkComponent={Link} href="/">
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText>Новая привычка</ListItemText>
              </ListItemButton>
            </List>
          </NestedListItemButton>
        </Paper>
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
    </>
  );
}
