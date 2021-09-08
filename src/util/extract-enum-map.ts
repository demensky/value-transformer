import type {EnumDefinition} from '../type/enum-definition';
import type {EnumLike} from '../type/enum-like';

export function extractEnumMap<K extends string, V extends EnumLike>(
  definition: EnumDefinition<K, V>,
): Map<K, V> {
  const result = new Map<string, V>(Object.entries<V>(definition));

  for (const key in definition) {
    if (typeof definition[key] === 'number') {
      result.delete(String(definition[key]));
    }
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return result as Map<K, V>;
}
