import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {Uint8Transformer} from './uint8-transformer.js';

export function asUint8(): ValueTransformerDecorator<number, number> {
  return createValueTransformerDecorator<number, number>(
    new Uint8Transformer(),
  );
}
