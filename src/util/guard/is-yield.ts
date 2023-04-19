export function isYield<T, TReturn = unknown>(
  value: IteratorResult<T, TReturn>,
): value is IteratorYieldResult<T> {
  return value.done !== true;
}
