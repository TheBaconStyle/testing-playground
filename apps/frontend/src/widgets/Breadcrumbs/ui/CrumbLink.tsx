import {
  type LinkProps as MuiLinkProps,
  Link as MUILink,
  Typography,
} from '@mui/material';
import Link, { LinkProps } from 'next/link';
import { Route } from 'next';

export type TBreadcrumbLink = MuiLinkProps & LinkProps<Route>;

export function CrumbLink({ ...props }: TBreadcrumbLink) {
  if (!props.href) {
    return <Typography {...props} />;
  }

  return <MUILink component={Link} {...props} color="inherit" />;
}
