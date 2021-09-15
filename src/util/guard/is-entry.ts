const ENTRY_LENGTH = 2;

export function isEntry(
  value: readonly unknown[],
): value is readonly [unknown, unknown] {
  return value.length === ENTRY_LENGTH;
}
