/* istanbul ignore file */

import {expect} from 'vitest';

import type {RestrictedDataView} from '../src/type/restricted-data-view.js';
import {isGenerator} from '../src/util/is-generator.js';

import {hexDataView} from './hex-data-view.js';

expect.extend({
  toDecode(
    decoder: unknown,
    expected: unknown,
    chunksHexString: readonly string[],
  ) {
    if (!isGenerator(decoder)) {
      throw new TypeError();
    }

    const chunks: readonly RestrictedDataView[] =
      chunksHexString.map(hexDataView);

    let request: IteratorResult<unknown, unknown> = decoder.next();
    let count = 0;

    for (const chunk of chunks) {
      if (request.value !== chunk.byteLength) {
        return {
          pass: false,
          message: () =>
            `expected decoder to request chunk ${count} of length ${chunk.byteLength}`,
          expected: chunk.byteLength,
          actual: request.value,
        };
      }

      request = decoder.next(chunk);
      count++;
    }

    if (count !== chunks.length) {
      return {
        pass: false,
        message: () => `expected decoder to request ${chunks.length} chunks`,
        expected: chunks.length,
        actual: count,
      };
    }

    if (!this.equals(request.value, expected)) {
      return {
        pass: false,
        message: () =>
          `expected decoder to return ${this.utils.stringify(
            expected,
            undefined,
            {min: true},
          )}`,
        expected,
        actual: request.value,
      };
    }

    return {pass: true, message: () => 'TODO'};
  },
});

interface ToDecodeMatcher<R = unknown> {
  toDecode(expected: unknown, chunks: readonly string[]): R;
}

declare global {
  namespace Vi {
    interface Assertion extends ToDecodeMatcher {}
  }
}
