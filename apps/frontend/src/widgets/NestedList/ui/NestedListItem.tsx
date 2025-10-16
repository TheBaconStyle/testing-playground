'use client';
import {
  Collapse,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Route } from 'next';
import { usePathname } from 'next/navigation';
import { MouseEvent, ReactNode, useCallback, useEffect, useState } from 'react';

export type TNestedListItem = {
  text: string;
  icon: ReactNode;
  route?: Route;
} & ListItemButtonProps;

export function NestedListItemButton({
  children,
  text,
  icon,
  onClick,
  route,
  ...props
}: TNestedListItem) {
  const pathname = usePathname();

  const [isOpen, setOpen] = useState(
    () => !!route && pathname.startsWith(route),
  );

  useEffect(() => {
    if (!!route) setOpen(pathname.startsWith(route));
  }, [pathname, route]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      setOpen((open) => !open);
    },
    [onClick],
  );

  return (
    <>
      <ListItemButton {...props} onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>

        <ListItemText>{text}</ListItemText>
      </ListItemButton>
      <Collapse in={isOpen} sx={{ pl: 4 }}>
        {children}
      </Collapse>
    </>
  );
}
