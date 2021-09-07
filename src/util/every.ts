export function every<T>(
  list: Iterable<T>,
  predicate: (item: T) => boolean,
): boolean {
  for (const item of list) {
    if (!predicate(item)) {
      return false;
    }
  }

  return true;
}
