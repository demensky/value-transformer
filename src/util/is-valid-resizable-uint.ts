export function isValidResizableUint(length: number): boolean {
  return Number.isSafeInteger(length) && length >= 0;
}
