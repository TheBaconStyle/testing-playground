'use client';

import { Button } from '@mui/material';
import { action } from './action';

export function Test() {
  return (
    <Button onClick={async () => alert(JSON.stringify(await action()))}>
      Action
    </Button>
  );
}
