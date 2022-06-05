import type {EnumDefinition} from '../../type/enum-definition.js';

import {EnumStringTransformer} from './enum-string-transformer.js';

export function asEnumString<K extends string, V extends string>(
  definition: EnumDefinition<K, V>,
): EnumStringTransformer<V> {
  return EnumStringTransformer.fromDefinition<K, V>(definition);
}
