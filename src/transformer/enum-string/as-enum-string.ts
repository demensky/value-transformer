import type {EnumDefinition} from '../../type/enum-definition.js';
import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {EnumStringTransformer} from './enum-string-transformer.js';

export function asEnumString<K extends string, V extends string>(
  definition: EnumDefinition<K, V>,
): ValueTransformerDecorator<V, V> {
  return createValueTransformerDecorator<V, V>(
    EnumStringTransformer.fromDefinition<K, V>(definition),
  );
}
