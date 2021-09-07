export function isSet(value: unknown): value is ReadonlySet<unknown> {
  return value instanceof Set;
}
