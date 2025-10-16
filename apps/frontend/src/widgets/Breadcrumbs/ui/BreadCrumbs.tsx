'use client';

import { BREADCRUMBS_ID, generateBreadCrumbs } from '@/widgets/Breadcrumbs/lib';
import { Breadcrumbs, BreadcrumbsProps } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { CrumbLink } from './CrumbLink';
import { Route } from 'next';
import { useState } from 'react';
import { useEffect } from 'react';

export type TBreadCrumbs = {
  childrenOrigin?: 'before' | 'after';
  auto?: boolean;
  localization?: Partial<{
    [K in Route]: string;
  }>;
} & BreadcrumbsProps;

export function BreadCrumbs({
  childrenOrigin,
  auto,
  localization,
  ...props
}: TBreadCrumbs) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(window.document.getElementById(BREADCRUMBS_ID));
  }, []);

  const pathname = usePathname();

  const breadCrumbLinks = useMemo(
    () => generateBreadCrumbs(pathname, localization),
    [pathname, localization],
  );

  if (!container) return null;

  return (
    <>
      {createPortal(
        <Breadcrumbs
          {...props}
          sx={{ ...props.sx, userSelect: 'none', color: 'inherit' }}
        >
          {childrenOrigin === 'before' && props.children}
          {auto &&
            breadCrumbLinks.map((link) => (
              <CrumbLink href={link.href} key={link.href}>
                {link.label}
              </CrumbLink>
            ))}
          {props.children}
          {childrenOrigin === 'after' && props.children}
        </Breadcrumbs>,
        container!,
      )}
    </>
  );
}
