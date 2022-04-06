export function isInSet<T>(value: unknown, set: ReadonlySet<T>): value is T {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return set.has(value as T);
}
