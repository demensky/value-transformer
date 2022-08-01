/* istanbul ignore file */

import {equals} from '@jest/expect-utils';
import {expect} from '@jest/globals';
import {
  matcherHint,
  printDiffOrStringify,
  printExpected,
  printReceived,
} from 'jest-matcher-utils';

import {isGenerator} from '../src/util/is-generator.js';

import type {TestYield} from './test-yield.js';

function toYieldsThrowPass(
  pass: boolean,
  message: (() => string) | null,
): {pass: boolean; message: () => string} {
  return {
    pass,
    message: () => {
      let result: string = matcherHint(
        'toYieldsThrow',
        'generator',
        'expectedYields',
        {secondArgument: 'expectedErrorConstructor', isNot: pass},
      );

      if (message !== null) {
        result += `\n\n${message()}`;
      }

      return result;
    },
  };
}

export function toYieldsThrow(
  generator: unknown,
  expectedYields: readonly TestYield[],
  expectedErrorConstructor: new (...args: never) => object,
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
        return toYieldsThrowPass(false, () =>
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
      return toYieldsThrowPass(false, () =>
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

    return toYieldsThrowPass(false, () =>
      [
        `Expected: error ${printExpected(expectedErrorConstructor)}`,
        `Received: return ${printReceived(receivedReturn)}`,
      ].join('\n'),
    );
  } catch (receivedError) {
    return receivedError instanceof expectedErrorConstructor
      ? toYieldsThrowPass(true, null)
      : toYieldsThrowPass(false, () =>
          [
            `Expected error class:    ${printExpected(
              expectedErrorConstructor,
            )}`,
            `Received error instance: ${printReceived(receivedError)}`,
          ].join('\n'),
        );
  }
}

expect.extend({toYieldsThrow});

declare module 'expect' {
  interface Matchers<R> {
    toYieldsThrow(
      expectedYields: readonly TestYield[],
      expectedErrorConstructor: unknown,
    ): R;
  }
}
