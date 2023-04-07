import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {StringTransformer} from './string-transformer.js';

export function asString(): ValueTransformerDecorator<string, string> {
  return createValueTransformerDecorator<string, string>(
    new StringTransformer(),
  );
}
