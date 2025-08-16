'use client';

import { useEffect, useRef } from 'react';
import { type CrumbPath, useBreadCrumbs } from '../lib';

export type TCrumbLabel = {} & CrumbPath;

export default function CrumbLabel({ label, href, isLink }: TCrumbLabel) {
  const { replacePathLabel, paths } = useBreadCrumbs();

  const isReplaced = useRef(false);

  useEffect(() => {
    if (!isReplaced.current) {
      isReplaced.current = replacePathLabel(href, { label, isLink });
    }
  }, [label, href, isLink, paths, replacePathLabel]);

  return null;
}
