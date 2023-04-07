import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {BigIntTransformer} from './big-int-transformer.js';

export function asBigInt(): ValueTransformerDecorator<bigint, bigint> {
  return createValueTransformerDecorator<bigint, bigint>(
    new BigIntTransformer(),
  );
}
