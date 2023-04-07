import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {Int8Transformer} from './int8-transformer.js';

export function asInt8(): ValueTransformerDecorator<number, number> {
  return createValueTransformerDecorator<number, number>(new Int8Transformer());
}
