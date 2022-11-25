import type {Unverified} from '../type/unverified.js';

import {isObject} from './guard/is-object.js';

export function isGenerator(
  value: unknown,
): value is Generator<unknown, unknown> {
  if (!isObject(value)) {
    return false;
  }

  const unverifiedValue: Unverified<Generator<unknown, unknown>> = value;

  return (
    typeof unverifiedValue.next === 'function' &&
    typeof unverifiedValue.return === 'function' &&
    typeof unverifiedValue.throw === 'function'
  );
}
