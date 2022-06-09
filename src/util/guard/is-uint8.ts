import {UINT8_MAX_VALUE} from '../../const/uint8-max-value.js';

export function isUint8(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= UINT8_MAX_VALUE;
}
