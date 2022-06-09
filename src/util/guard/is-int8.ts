import {INT8_MAX_VALUE} from '../../const/int8-max-value.js';
import {INT8_MIN_VALUE} from '../../const/int8-min-value.js';

export function isInt8(value: number): boolean {
  return (
    Number.isInteger(value) &&
    value >= INT8_MIN_VALUE &&
    value <= INT8_MAX_VALUE
  );
}
