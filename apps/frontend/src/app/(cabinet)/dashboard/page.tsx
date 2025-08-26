'use client';
import { reactAuthCLient } from '@/features/auth/api/react';
import { Alert, Box, Button } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box>
      Dashboard page
      <Button
        onClick={() => {
          reactAuthCLient
            .isUsernameAvailable({ username: 'qwe' })
            .then(JSON.stringify)
            .then(alert);
        }}
      >
        Qwe
      </Button>
      <Alert severity="info">Qwe</Alert>
    </Box>
  );
}
