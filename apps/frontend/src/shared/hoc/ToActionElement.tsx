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
  return (props: T & { action?: () => void }) => {
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
};
