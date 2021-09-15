export function isNumberOrString(value: unknown): value is number | string {
  const valueType = typeof value;

  return valueType === 'number' || valueType === 'string';
}
