import {ValueTransformer} from './value-transformer.js';
import type {ValueTransformerLike} from './value-transformer-like.js';

export function normalizeValueTransformer<I, O extends I>(
  transformer: ValueTransformerLike<I, O>,
): ValueTransformer<I, O> {
  return transformer instanceof ValueTransformer
    ? transformer
    : transformer(null, null);
}
