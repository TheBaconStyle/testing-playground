import { LinkProps as MuiLinkProps, Link as MUILink } from "@mui/material";
import Link, { LinkProps } from "next/link";

export type TBreadcrumbLink = MuiLinkProps & LinkProps & {};

export function Crumb({ ...props }: TBreadcrumbLink) {
  return (
    <MUILink component={Link} underline="hover" color="inherit" {...props} />
  );
}
