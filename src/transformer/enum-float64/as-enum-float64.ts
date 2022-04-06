import type {EnumDefinition} from '../../type/enum-definition';

import {EnumFloat64Transformer} from './enum-float64-transformer';

export function asEnumFloat64<K extends string, V extends number>(
  definition: EnumDefinition<K, V>,
): EnumFloat64Transformer<V> {
  return EnumFloat64Transformer.fromDefinition<K, V>(definition);
}
