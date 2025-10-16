'use client';
import { Box, BoxProps } from '@mui/material';
import { BREADCRUMBS_ID } from '../lib';

export type TBreadcrumbsContainer = {} & BoxProps;

export function BreadCrumbsContainer({ ...props }: TBreadcrumbsContainer) {
  return (
    <Box {...props} sx={{ ...props.sx, display: 'flex' }} id={BREADCRUMBS_ID} />
  );
}
