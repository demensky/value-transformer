import {INT16_MAX_VALUE} from '../../const/int16-max-value.js';
import {INT16_MIN_VALUE} from '../../const/int16-min-value.js';

export function isInt16(value: number): boolean {
  return (
    Number.isInteger(value) &&
    value >= INT16_MIN_VALUE &&
    value <= INT16_MAX_VALUE
  );
}
