import {OneOfTransformer} from './one-of-transformer';
import type {OneOfTransformerTransformers} from './one-of-transformer-transformers';

export function asOneOf<I extends readonly unknown[], O extends I>(
  transformers: OneOfTransformerTransformers<I, O>,
): OneOfTransformer<I, O> {
  return new OneOfTransformer<I, O>(transformers);
}
