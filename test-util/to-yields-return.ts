/* istanbul ignore file */

import {equals} from '@jest/expect-utils';
import {expect} from '@jest/globals';
import {matcherHint, printDiffOrStringify} from 'jest-matcher-utils';

import {isGenerator} from '../src/util/is-generator.js';

import type {TestYield} from './test-yield.js';

function toYieldsReturnPass(
  pass: boolean,
  message: (() => string) | null,
): {pass: boolean; message: () => string} {
  return {
    pass,
    message: () => {
      let result: string = matcherHint(
        'toYieldsReturn',
        'generator',
        'expectedYields',
        {secondArgument: 'expectedReturn', isNot: pass},
      );

      if (message !== null) {
        result += `\n\n${message()}`;
      }

      return result;
    },
  };
}

export function toYieldsReturn(
  generator: unknown,
  expectedYields: readonly TestYield[],
  expectedReturn: unknown,
): {pass: boolean; message(): string} {
  if (!isGenerator(generator)) {
    throw new TypeError();
  }

  try {
    let request: IteratorResult<unknown, unknown> = generator.next();
    const receivedRequests: unknown[] = [];
    let index = 0;

    while (request.done !== true) {
      if (index >= expectedYields.length) {
        return toYieldsReturnPass(false, () =>
          printDiffOrStringify(
            expectedYields.length,
            index + 1,
            'Expected requests count',
            'Received requests count',
            true,
          ),
        );
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

    if (!equals(expectedRequests, receivedRequests, [], true)) {
      return toYieldsReturnPass(false, () =>
        printDiffOrStringify(
          expectedRequests,
          receivedRequests,
          'Expected requests',
          'Received requests',
          true,
        ),
      );
    }

    const receivedReturn: unknown = request.value;

    if (!equals(receivedReturn, expectedReturn, [], true)) {
      return toYieldsReturnPass(false, () =>
        printDiffOrStringify(
          expectedReturn,
          receivedReturn,
          'Expected return',
          'Received return',
          true,
        ),
      );
    }

    return toYieldsReturnPass(true, null);
  } catch (error) {
    return toYieldsReturnPass(false, () => `Throw error: ${String(error)}`);
  }
}

expect.extend({toYieldsReturn});

declare module 'expect' {
  interface Matchers<R> {
    toYieldsReturn(
      expectedYields: readonly TestYield[],
      expectedReturn: unknown,
    ): R;
  }
}
