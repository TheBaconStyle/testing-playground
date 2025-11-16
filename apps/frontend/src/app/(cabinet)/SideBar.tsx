import { NestedListItemButton } from '@/widgets/NestedList/ui/NestedListItem';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { SignOutButton } from './SignOutButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from '@/components/Link/Link';

export function SideBar() {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
      <List>
        <NestedListItemButton
          text="Основное"
          icon={<AppsIcon />}
          route="/dashboard"
        >
          <List>
            <ListItemButton LinkComponent={Link} href="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText>Панель управления</ListItemText>
            </ListItemButton>
            <ListItemButton LinkComponent={Link} href="/dashboard/me">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText>Профиль</ListItemText>
            </ListItemButton>
          </List>
        </NestedListItemButton>
        <NestedListItemButton
          text="Привычки"
          icon={<TaskAltIcon />}
          route="/habits"
        >
          <List>
            <ListItemButton LinkComponent={Link} href="/habits">
              <ListItemIcon>
                <TaskAltIcon />
              </ListItemIcon>
              <ListItemText>Все привычки</ListItemText>
            </ListItemButton>
            <ListItemButton LinkComponent={Link} href="/habits/new">
              <ListItemIcon>
                <AddCircleOutlineIcon />
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
  );
}
