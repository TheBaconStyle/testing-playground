'use client';

import { Breadcrumbs, type BreadcrumbsProps, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import { type CrumbPath, useBreadcrumbs } from '../model/store';
import { Crumb } from './Crumb';

export type TBreadcrumbsContainer = {
  basePath?: string;
  basePathLabel?: string;
} & BreadcrumbsProps;

export function BreadCrumbs({
  basePath = '/',
  basePathLabel = 'Главная',
  ...props
}: TBreadcrumbsContainer) {
  const pathname = usePathname();

  const generatedBreadcrumbPaths: CrumbPath[] = useMemo(() => {
    const newPaths = pathname
      .split('/')
      .filter((item) => item !== basePath.replace('/', ''))
      .filter(Boolean)
      .map((path, index, paths) => ({
        href: `/${paths.slice(0, index + 1).join('/')}`,
        label: path,
      }));
    return [
      { href: basePath, label: basePathLabel, isLink: true },
      ...newPaths,
    ];
  }, [basePath, basePathLabel, pathname]);

  const paths = useBreadcrumbs((b) => b.paths);

  const setPaths = useBreadcrumbs((b) => b.setPaths);

  useEffect(() => {
    setPaths([...generatedBreadcrumbPaths]);
  }, [setPaths, generatedBreadcrumbPaths]);

  const defaultPaths = paths.length === 0 ? generatedBreadcrumbPaths : paths;

  return (
    <Breadcrumbs
      {...props}
      sx={{ ...props.sx, userSelect: 'none', color: 'inherit' }}
    >
      {defaultPaths.map(({ label, href, isLink }, index, arr) => {
        if (index !== arr.length - 1 && !!isLink) {
          return (
            <Crumb href={href} underline="hover" key={href}>
              {label}
            </Crumb>
          );
        }
        return <Typography key={href}>{label}</Typography>;
      })}
    </Breadcrumbs>
  );
}
