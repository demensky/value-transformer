export function isReturn<T, TReturn = unknown>(
  value: IteratorResult<T, TReturn>,
): value is IteratorReturnResult<TReturn> {
  return value.done === true;
}
