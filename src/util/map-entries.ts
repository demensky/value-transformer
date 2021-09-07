export function* mapEntries<KI, KO, VI, VO>(
  list: Iterable<readonly [KI, VI]>,
  keyMapper: (key: KI) => KO,
  valueMapper: (value: VI) => VO,
): Iterable<[KO, VO]> {
  for (const [key, value] of list) {
    yield [keyMapper(key), valueMapper(value)];
  }
}
