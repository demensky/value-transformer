/* istanbul ignore file */

import {expect} from 'vitest';

import {isYield} from '../src/util/guard/is-yield.js';
import {isGenerator} from '../src/util/is-generator.js';

import type {TestYield} from './test-yield.js';

expect.extend({
  toYieldsReturn(
    generator: unknown,
    expectedReturn: unknown,
    expectedYields: readonly TestYield[],
  ) {
    if (!isGenerator(generator)) {
      throw new TypeError();
    }

    try {
      let request: IteratorResult<unknown, unknown> = generator.next();
      const receivedRequests: unknown[] = [];
      let index = 0;

      while (isYield(request)) {
        if (index >= expectedYields.length) {
          return {
            pass: false,
            message: () =>
              `number of requests more than expected ${expectedYields.length}`,
          };
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const [_expectedRequest, response] = expectedYields[index]!;
        receivedRequests.push(request.value);

        request = generator.next(response);
        index++;
      }

      const expectedRequests: unknown[] = expectedYields.map(
        ([expectedRequest]) => expectedRequest,
      );

      if (!this.equals(expectedRequests, receivedRequests)) {
        return {
          pass: false,
          message: () => 'request inconsistency',
          expected: expectedRequests,
          actual: receivedRequests,
        };
      }

      const receivedReturn: unknown = request.value;

      if (!this.equals(receivedReturn, expectedReturn)) {
        return {
          pass: false,
          message: () => 'return',
          expected: expectedReturn,
          actual: receivedReturn,
        };
      }

      return {pass: true, message: () => 'TODO'};
    } catch (error) {
      return {pass: false, message: () => 'unexpected error'};
    }
  },
});

interface ToYieldsReturnMatcher<R = unknown> {
  toYieldsReturn(
    expectedReturn: unknown,
    expectedYields: readonly TestYield[],
  ): R;
}

declare global {
  namespace Vi {
    interface Assertion extends ToYieldsReturnMatcher {}
  }
}
