import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {NeverTransformer} from './never-transformer.js';

export function asNever(): ValueTransformerDecorator<never, never> {
  return createValueTransformerDecorator<never, never>(new NeverTransformer());
}
