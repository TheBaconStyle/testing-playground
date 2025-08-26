'use client';

import { ToSignOutButton } from '@/features/auth/lib/ToSignOutElement';
import { ListItemButton } from '@mui/material';

export const SignOutButton = ToSignOutButton(ListItemButton);
