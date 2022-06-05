import type {ValueTransformerInput} from '../../base/value-transformer-input.js';
import type {ValueTransformerOutput} from '../../base/value-transformer-output.js';

export type UnionTransformerTransformers<
  I extends readonly unknown[],
  O extends I,
> = {
  readonly [K in keyof I]: ValueTransformerInput<I[K]>;
} & {
  readonly [K in keyof O]: ValueTransformerOutput<O[K]>;
};
