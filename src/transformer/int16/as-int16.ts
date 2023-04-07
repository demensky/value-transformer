import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {Int16Transformer} from './int16-transformer.js';

export function asInt16(): ValueTransformerDecorator<number, number> {
  return createValueTransformerDecorator<number, number>(
    new Int16Transformer(),
  );
}
