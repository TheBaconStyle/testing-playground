'use client';
import React, { ComponentType, HTMLAttributes } from 'react';
import { reactAuthCLient } from '../api/react';
import { useRouter } from 'next/navigation';

export function ToSignOutButton<T extends HTMLAttributes<HTMLElement>>(
  Comp: ComponentType<T>,
) {
  return (props: T) => {
    const router = useRouter();
    return (
      <Comp
        {...props}
        onClick={async (e) => {
          props.onClick?.(e);
          await reactAuthCLient.signOut();
          router.refresh();
        }}
      />
    );
  };
}
