const IS_DECIMAL = /^-?\d+$/;

// TODO replace regexp to simple loop check
export function isDecimalIntString(value: string): boolean {
  return IS_DECIMAL.test(value);
}
