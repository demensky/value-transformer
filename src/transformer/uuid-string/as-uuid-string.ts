import type {UuidString} from '../../type/uuid-string.js';
import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {UuidStringTransformer} from './uuid-string-transformer.js';

export function asUuidString<T extends UuidString>(): ValueTransformerDecorator<
  T,
  T
> {
  return createValueTransformerDecorator<T, T>(new UuidStringTransformer<T>());
}
