import type {KeysWithExactType} from './keys-with-exact-type.js';

export type TransformableFieldDecorator<I, O extends I> = <T extends object>(
  prototype: T,
  key: KeysWithExactType<T, I> | KeysWithExactType<T, O>,
) => void;
