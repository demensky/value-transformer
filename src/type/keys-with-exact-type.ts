import type {OnlyExactType} from './only-exact-type';

export type KeysWithExactType<T, V> = {
  readonly [K in keyof T]: OnlyExactType<T[K], V, K>;
}[string & keyof T];
