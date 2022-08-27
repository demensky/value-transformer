import {HEX_RADIX} from '../const/hex-radix.js';

export function parseHexInt(value: string): number {
  return parseInt(value, HEX_RADIX);
}
