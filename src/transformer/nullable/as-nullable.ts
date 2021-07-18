import type {ValueTransformer} from '../../base/value-transformer';

import {NullableTransformer} from './nullable-transformer';

export function asNullable<I, O extends I>(
  transformer: ValueTransformer<I, O>,
): NullableTransformer<I, O> {
  return new NullableTransformer<I, O>(transformer);
}
