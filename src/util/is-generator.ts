import type {UnverifiedObject} from '../type/unverified-object.js';

import {isObject} from './guard/is-object.js';
import {identity} from './identity.js';

export function isGenerator(
  value: unknown,
): value is Generator<unknown, unknown> {
  return (
    isObject(value) &&
    typeof identity<UnverifiedObject<Generator<unknown, unknown>>>(value)
      .next === 'function' &&
    typeof identity<UnverifiedObject<Generator<unknown, unknown>>>(value)
      .return === 'function' &&
    typeof identity<UnverifiedObject<Generator<unknown, unknown>>>(value)
      .throw === 'function'
  );
}
