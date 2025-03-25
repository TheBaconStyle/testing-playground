'use client';
import {
  Collapse,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { MouseEvent, ReactNode, useCallback, useState } from 'react';

export type TNestedListItem = {
  text: string;
  icon: ReactNode;
} & ListItemButtonProps;

export function NestedListItemButton({
  children,
  text,
  icon,
  onClick,
  ...props
}: TNestedListItem) {
  const [isOpen, setOpen] = useState(false);

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
