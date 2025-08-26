import { BreadCrumbs } from '@/widgets/Breadcrumbs/ui/BreadCrumbs';
import { Header } from '@/widgets/Header/ui/Header';
import { NestedListItemButton } from '@/widgets/NestedList/ui/NestedListItem';
import { Dashboard } from '@mui/icons-material';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { SignOutButton } from './SignOutButton';

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
        <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
          <List>
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
          </List>
          <List sx={{ mt: 'auto' }}>
            <SignOutButton sx={{ width: '100%' }}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Выход</ListItemText>
            </SignOutButton>
          </List>
        </Paper>
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
    </>
  );
}
