import type {EnumDefinition} from '../type/enum-definition';
import type {EnumLike} from '../type/enum-like';

export function extractEnumValues<K extends string, V extends EnumLike>(
  definition: EnumDefinition<K, V>,
): Set<V> {
  const result = new Map<string, V>(Object.entries<V>(definition));

  for (const key in definition) {
    if (typeof definition[key] === 'number') {
      result.delete(String(definition[key]));
    }
  }

  return new Set<V>(result.values());
}
