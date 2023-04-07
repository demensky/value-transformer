import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {Int32Transformer} from './int32-transformer.js';

export function asInt32(): ValueTransformerDecorator<number, number> {
  return createValueTransformerDecorator<number, number>(
    new Int32Transformer(),
  );
}
