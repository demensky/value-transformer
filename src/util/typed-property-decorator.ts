// TODO implement symbol support
export type TypedPropertyDecorator<T> = <
  K extends string,
  I extends Record<K, T>,
>(
  target: I,
  propertyKey: K,
) => void;
