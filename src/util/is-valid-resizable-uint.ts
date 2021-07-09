const MINIMAL_VALUE = 0;

export function isValidResizableUint(length: number): boolean {
  return Number.isSafeInteger(length) && length >= MINIMAL_VALUE;
}
