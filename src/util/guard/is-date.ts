import type {ReadonlyDate} from '../../type/readonly-date.js';

export function isDate(value: unknown): value is ReadonlyDate {
  return value instanceof Date;
}
