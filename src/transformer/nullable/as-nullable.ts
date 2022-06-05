import type {ValueTransformer} from '../../base/value-transformer.js';

import {NullableTransformer} from './nullable-transformer.js';

export function asNullable<I, O extends I>(
  transformer: ValueTransformer<I, O>,
): NullableTransformer<I, O> {
  return new NullableTransformer<I, O>(transformer);
}
