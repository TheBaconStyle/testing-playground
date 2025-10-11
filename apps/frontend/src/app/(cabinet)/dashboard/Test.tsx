'use client';

import { Button } from '@mui/material';
import { Qwe } from './action';

export function Test() {
  return <Button onClick={() => Qwe().then(alert)}>click me</Button>;
}
