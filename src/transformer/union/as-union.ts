import {UnionTransformer} from './union-transformer.js';
import type {UnionTransformerTransformers} from './union-transformer-transformers.js';

export function asUnion<I extends readonly unknown[], O extends I>(
  transformers: UnionTransformerTransformers<I, O>,
): UnionTransformer<I, O> {
  return new UnionTransformer<I, O>(transformers);
}
