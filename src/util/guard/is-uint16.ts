import {UINT16_MAX_VALUE} from '../../const/uint16-max-value.js';

export function isUint16(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= UINT16_MAX_VALUE;
}
