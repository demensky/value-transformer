import type {EnumDefinition} from '../../type/enum-definition';
import type {EnumLike} from '../../type/enum-like';

import {EnumTransformer} from './enum-transformer';

export function asEnum<K extends string, V extends EnumLike>(
  definition: EnumDefinition<K, V>,
): EnumTransformer<V> {
  return EnumTransformer.fromDefinition<K, V>(definition);
}
