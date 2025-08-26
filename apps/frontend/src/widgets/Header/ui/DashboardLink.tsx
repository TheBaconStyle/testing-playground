'use client';

import { reactAuthCLient } from '../../../../src/features/auth/api/react';
import { Button } from '@mui/material';
import Link from 'next/link';

export function DashboardLink() {
  const { isPending, data, error } = reactAuthCLient.useSession();

  if ((isPending || error) && !data) return null;

  return (
    <Button component={Link} href="/dashboard" variant="contained">
      Go to dashboard
    </Button>
  );
}
