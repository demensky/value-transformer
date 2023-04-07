import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {Uint16Transformer} from './uint16-transformer.js';

export function asUint16(): ValueTransformerDecorator<number, number> {
  return createValueTransformerDecorator<number, number>(
    new Uint16Transformer(),
  );
}
