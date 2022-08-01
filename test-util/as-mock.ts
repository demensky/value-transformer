/* istanbul ignore file */

import {MockTransformer} from './mock-transformer.js';

export function asMock<T>(
  compatible: boolean,
  data: T,
  buffer: readonly number[],
  literal: unknown,
  compact: unknown,
): MockTransformer<T> {
  return new MockTransformer<T>(
    compatible,
    data,
    new Uint8Array(buffer),
    compact,
    literal,
  );
}
