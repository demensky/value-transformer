import type {KeysWithExactType} from '../../type/keys-with-exact-type.js';

import type {ValueTransformer} from './value-transformer.js';

export interface ValueTransformerDecorator<I, O extends I> {
  <T extends object>(
    prototype: T,
    key: KeysWithExactType<T, I> | KeysWithExactType<T, O>,
  ): void;
  (prototype: null, key: null): ValueTransformer<I, O>;
}
