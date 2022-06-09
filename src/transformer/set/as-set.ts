import type {ValueTransformer} from '../../base/value-transformer.js';

import {SetTransformer} from './set-transformer.js';

export function asSet<I, O extends I>(
  transformer: ValueTransformer<I, O>,
): SetTransformer<I, O> {
  return new SetTransformer<I, O>(transformer);
}
