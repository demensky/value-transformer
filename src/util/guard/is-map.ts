export function isMap(value: unknown): value is ReadonlyMap<unknown, unknown> {
  return value instanceof Map;
}
