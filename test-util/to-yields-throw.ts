/* istanbul ignore file */

import {expect} from 'vitest';

import {isGenerator} from '../src/util/is-generator.js';

import type {TestYield} from './test-yield.js';

expect.extend({
  toYieldsThrow(
    generator: unknown,
    expectedYields: readonly TestYield[],
    expectedErrorConstructor: new (...args: never) => object,
  ) {
    if (!isGenerator(generator)) {
      throw new TypeError();
    }

    try {
      let request: IteratorResult<unknown, unknown> = generator.next();
      const receivedRequests: unknown[] = [];
      let index = 0;

      while (request.done !== true) {
        if (index >= expectedYields.length) {
          return {
            pass: false,
            message: () => `expected requests ${expectedYields.length}`,
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
          message: () => 'requests',
          expected: expectedRequests,
          actual: receivedRequests,
        };
      }

      // TODO
      // const receivedReturn: unknown = request.value;

      return {pass: false, message: () => 'expected result to be error'};
    } catch (receivedError) {
      return receivedError instanceof expectedErrorConstructor
        ? {pass: true, message: () => 'TODO true'}
        : {pass: false, message: () => 'TODO false'};
    }
  },
});

interface ToYieldsThrowMatcher<R = unknown> {
  toYieldsThrow(
    expectedYields: readonly TestYield[],
    expectedReturn: unknown,
  ): R;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Assertion extends ToYieldsThrowMatcher {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface AsymmetricMatchersContaining extends ToYieldsThrowMatcher {}
  }
}
