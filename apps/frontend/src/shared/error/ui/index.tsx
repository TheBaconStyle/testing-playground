'use client';

import Error, { ErrorProps } from 'next/error';

export function NextError(props: ErrorProps) {
  return <Error {...props} />;
}
