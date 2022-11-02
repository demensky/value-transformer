export function* prototypeChain<T extends object>(
  prototype: T | null,
): Iterable<T> {
  if (prototype === null || prototype === Object.prototype) {
    return;
  }

  yield* prototypeChain(Object.getPrototypeOf(prototype));

  yield prototype;
}
