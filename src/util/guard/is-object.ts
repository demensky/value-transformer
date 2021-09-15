export function isObject(value: unknown): value is object {
  const valueType = typeof value;

  return (valueType === 'object' && value !== null) || valueType === 'function';
}
