import type {ValueTransformer} from '../../base/value-transformer.js';

import {ArrayTransformer} from './array-transformer.js';

export function asArray<I, O extends I>(
  transformer: ValueTransformer<I, O>,
): ArrayTransformer<I, O> {
  return new ArrayTransformer<I, O>(transformer);
}
