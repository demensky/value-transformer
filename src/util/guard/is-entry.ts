import {isArray} from './is-array';

const ENTRY_LENGTH = 2;

export function isEntry(value: unknown): value is readonly [unknown, unknown] {
  return isArray(value) && value.length === ENTRY_LENGTH;
}
