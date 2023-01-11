import type {Unverified} from '../type/unverified.js';

import {isObject} from './guard/is-object.js';

export function isIterator(
  value: unknown,
): value is Generator<unknown, unknown> {
  if (!isObject(value)) {
    return false;
  }

  const unverifiedValue: Unverified<Iterator<unknown, unknown>> = value;

  return typeof unverifiedValue.next === 'function';
}
