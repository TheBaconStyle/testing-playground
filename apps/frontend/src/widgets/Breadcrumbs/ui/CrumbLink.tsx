import {
  type LinkProps as MuiLinkProps,
  Link as MUILink,
  Typography,
} from '@mui/material';
import Link, { LinkRestProps } from 'next/link';

export type TBreadcrumbLink = MuiLinkProps & LinkRestProps;

export function CrumbLink({ ...props }: TBreadcrumbLink) {
  if (!props.href) {
    return <Typography {...props} />;
  }

  return <MUILink component={Link} {...props} color="inherit" />;
}
