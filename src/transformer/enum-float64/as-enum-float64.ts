import type {EnumDefinition} from '../../type/enum-definition.js';
import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {EnumFloat64Transformer} from './enum-float64-transformer.js';

export function asEnumFloat64<K extends string, V extends number>(
  definition: EnumDefinition<K, V>,
): ValueTransformerDecorator<V, V> {
  return createValueTransformerDecorator<V, V>(
    EnumFloat64Transformer.fromDefinition<K, V>(definition),
  );
}
