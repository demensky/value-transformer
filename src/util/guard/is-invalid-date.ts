import type {ReadonlyDate} from '../../type/readonly-date.js';

export function isInvalidDate(data: ReadonlyDate): boolean {
  return Number.isNaN(data.getTime());
}
