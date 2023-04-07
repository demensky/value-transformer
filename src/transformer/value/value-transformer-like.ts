import type {ValueTransformer} from './value-transformer.js';
import type {ValueTransformerDecorator} from './value-transformer-decorator.js';

export type ValueTransformerLike<I, O extends I> =
  | ValueTransformer<I, O>
  | ValueTransformerDecorator<I, O>;
