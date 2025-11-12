export type Extends<T, U extends Partial<Record<keyof T, any>>> = Omit<
  T,
  keyof U
> &
  U;