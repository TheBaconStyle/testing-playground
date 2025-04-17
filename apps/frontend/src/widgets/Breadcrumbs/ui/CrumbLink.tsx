import { type LinkProps as MuiLinkProps, Link as MUILink } from '@mui/material';
import Link, { type LinkProps } from 'next/link';

export type TBreadcrumbLink = MuiLinkProps & LinkProps & {};

export function CrumbLink({ ...props }: TBreadcrumbLink) {
  return (
    <MUILink component={Link} underline="hover" color="inherit" {...props} />
  );
}
