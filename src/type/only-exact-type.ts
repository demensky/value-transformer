export type OnlyExactType<T0, T1, R> = T0 | T1 extends T1
  ? T0 | T1 extends T0
    ? R
    : never
  : never;
