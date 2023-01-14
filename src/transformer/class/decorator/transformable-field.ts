import type {ValueTransformer} from '../../value/value-transformer.js';

export type TransformableField<K extends string, I, O extends I> = [
  key: K,
  transformer: ValueTransformer<I, O>,
];
