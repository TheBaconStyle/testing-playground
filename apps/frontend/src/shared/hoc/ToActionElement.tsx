'use client';

interface WithClickHandler<E> {
  onClick?: React.MouseEventHandler<E>;
}

export const ToActionElement = <
  T extends WithClickHandler<E>,
  E extends HTMLElement,
>(
  Comp: React.ComponentType<T>,
) => {
  const Compose = (props: T & { action?: () => void }) => {
    const { action, onClick, ...compProps } = props;

    return (
      <Comp
        {...(compProps as T)}
        onClick={(e) => {
          onClick?.(e);
          action?.();
        }}
      />
    );
  };

  Compose.displayName = `${Comp.displayName}WithActionHandler`;

  return Compose;
};
