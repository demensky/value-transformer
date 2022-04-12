export function* prototypeChain<T extends object>(
  prototype: T | null,
): Iterable<T> {
  if (prototype === null) {
    return;
  }

  yield* prototypeChain(Object.getPrototypeOf(Object.prototype));

  yield prototype;
}
