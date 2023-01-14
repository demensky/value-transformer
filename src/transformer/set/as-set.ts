import type {ValueTransformer} from '../value/value-transformer.js';

import {SetTransformer} from './set-transformer.js';

export function asSet<I, O extends I>(
  transformer: ValueTransformer<I, O>,
): SetTransformer<I, O> {
  return new SetTransformer<I, O>(transformer);
}
