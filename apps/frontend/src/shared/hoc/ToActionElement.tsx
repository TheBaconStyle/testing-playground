'use client';

import { ComponentType, MouseEventHandler } from 'react';

// Определяем интерфейс, который гарантирует наличие onClick
// E - это дженерик, который будет представлять тип элемента, вызывающего событие
interface WithClickHandler<E> {
  onClick?: MouseEventHandler<E>;
}

// HOC теперь принимает два дженерика:
// T - пропсы компонента
// E - тип элемента, вызывающего событие
export const ToActionElement = <
  T extends WithClickHandler<E>,
  E extends HTMLElement,
>(
  Comp: ComponentType<T>,
) => {
  return (props: T & { action?: () => void }) => {
    const { action, ...compProps } = props;

    // TypeScript теперь гарантирует, что onClick существует и имеет правильный тип
    const originalOnClick = compProps.onClick;

    return (
      <Comp
        {...(compProps as T)}
        onClick={(e) => {
          originalOnClick?.(e);
          action?.();
        }}
      />
    );
  };
};
