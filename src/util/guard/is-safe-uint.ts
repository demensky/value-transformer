export function isSafeUint(value: number): boolean {
  return Number.isSafeInteger(value) && value >= 0;
}
