const IS_DECIMAL = /^(?:0|-?[1-9]\d*)$/;

// TODO replace regexp to simple loop check
export function isDecimalIntString(value: string): boolean {
  return IS_DECIMAL.test(value);
}
