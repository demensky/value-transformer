export function isInvalidDate(data: Date): boolean {
  return Number.isNaN(data.getDate());
}
