import type {ValueTransformer} from '../value/value-transformer.js';

import {NullableTransformer} from './nullable-transformer.js';

export function asNullable<I, O extends I>(
  transformer: ValueTransformer<I, O>,
): NullableTransformer<I, O> {
  return new NullableTransformer<I, O>(transformer);
}
