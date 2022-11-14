import type {ValueTransformersTuple} from '../../type/value-transformers-tuple.js';

import {UnionTransformer} from './union-transformer.js';

export function asUnion<I extends readonly unknown[], O extends I>(
  transformers: ValueTransformersTuple<I, O>,
): UnionTransformer<I, O> {
  return new UnionTransformer<I, O>(transformers);
}
