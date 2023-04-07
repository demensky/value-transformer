import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {Uint32Transformer} from './uint32-transformer.js';

export function asUint32(): ValueTransformerDecorator<number, number> {
  return createValueTransformerDecorator<number, number>(
    new Uint32Transformer(),
  );
}
