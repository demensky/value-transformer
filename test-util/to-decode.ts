/* istanbul ignore file */

import {expect} from 'vitest';

import type {RestrictedDataView} from '../src/type/restricted-data-view.js';
import {isGenerator} from '../src/util/is-generator.js';

import {hexDataView} from './hex-data-view.js';

expect.extend({
  toDecode(decoder: unknown, chunks: readonly string[], expected: unknown) {
    if (!isGenerator(decoder)) {
      throw new TypeError();
    }

    const views: readonly RestrictedDataView[] = chunks.map(hexDataView);

    let request: IteratorResult<unknown, unknown> = decoder.next();
    let index = 0;

    for (; request.done !== true && index < views.length; index++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const chunk: RestrictedDataView = views[index]!;

      if (request.value !== chunk.byteLength) {
        return {
          pass: false,
          message: () =>
            `expected decoder to request chunk ${index} of length ${chunk.byteLength}`,
          expected: chunk.byteLength,
          actual: request.value,
        };
      }

      request = decoder.next(chunk);
    }

    if (index !== views.length) {
      return {
        pass: false,
        message: () => `expected decoder to request ${views.length} chunks`,
        expected: views.length,
        actual: index,
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
  toDecode(chunks: readonly string[], expected: unknown): R;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Assertion extends ToDecodeMatcher {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface AsymmetricMatchersContaining extends ToDecodeMatcher {}
  }
}
