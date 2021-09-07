type Exact<A, B, R> = A | B extends B ? (A | B extends A ? R : never) : never;

type ExactTypeKeys<T, V> = {[K in keyof T]: Exact<T[K], V, K>}[keyof T];

export type ExactPropertyDecorator<V, K extends string | symbol> = <T>(
  target: T,
  propertyKey: ExactTypeKeys<T, V> & K,
) => void;
