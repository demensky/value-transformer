import type {ValueTransformer} from '../../../base/value-transformer';

export type TransformableField<K extends string, I, O extends I> = [
  key: K,
  transformer: ValueTransformer<I, O>,
];
