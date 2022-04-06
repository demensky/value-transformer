import type {EnumDefinition} from '../../type/enum-definition';

import {EnumStringTransformer} from './enum-string-transformer';

export function asEnumString<K extends string, V extends string>(
  definition: EnumDefinition<K, V>,
): EnumStringTransformer<V> {
  return EnumStringTransformer.fromDefinition<K, V>(definition);
}
