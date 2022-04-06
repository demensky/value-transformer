import {UINT32_MAX_VALUE} from '../../const/uint32-max-value';

export function isUint32(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= UINT32_MAX_VALUE;
}
