import { type LinkProps as MuiLinkProps, Link as MUILink } from '@mui/material';
import Link, { LinkRestProps } from 'next/link';

export type TBreadcrumbLink = MuiLinkProps & LinkRestProps & {};

export function CrumbLink({ ...props }: TBreadcrumbLink) {
  return (
    <MUILink component={Link} underline="hover" color="inherit" {...props} />
  );
}
