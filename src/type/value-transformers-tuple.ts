import type {ValueTransformerInput} from '../transformer/value/value-transformer-input.js';
import type {ValueTransformerOutput} from '../transformer/value/value-transformer-output.js';

export type ValueTransformersTuple<
  I extends readonly unknown[],
  O extends I,
> = {
  readonly [K in keyof I]: ValueTransformerInput<I[K]>;
} & {
  readonly [K in keyof O]: ValueTransformerOutput<O[K]>;
};
