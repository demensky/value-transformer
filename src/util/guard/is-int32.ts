import {INT32_MAX_VALUE} from '../../const/int32-max-value.js';
import {INT32_MIN_VALUE} from '../../const/int32-min-value.js';

export function isInt32(value: number): boolean {
  return (
    Number.isInteger(value) &&
    value >= INT32_MIN_VALUE &&
    value <= INT32_MAX_VALUE
  );
}
