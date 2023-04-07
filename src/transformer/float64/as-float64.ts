import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {Float64Transformer} from './float64-transformer.js';

export function asFloat64(): ValueTransformerDecorator<number, number> {
  return createValueTransformerDecorator<number, number>(
    new Float64Transformer(),
  );
}
