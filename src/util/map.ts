export function* map<I, O>(
  list: Iterable<I>,
  mapper: (item: I) => O,
): Iterable<O> {
  for (const item of list) {
    yield mapper(item);
  }
}
