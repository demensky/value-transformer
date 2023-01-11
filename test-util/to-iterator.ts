/* istanbul ignore file */

import {expect} from 'vitest';

import {isIterator} from '../src/util/is-iterator.js';

expect.extend({
  toIterator(iterator: unknown, expected: readonly unknown[]) {
    if (!isIterator(iterator)) {
      throw new TypeError();
    }

    const actual: readonly unknown[] = [...iterator];

    if (!this.equals(actual, expected)) {
      return {
        pass: false,
        message: () => 'items are not as expected',
        expected,
        actual,
      };
    }

    return {pass: true, message: () => 'TODO'};
  },
});

interface ToIteratorMatcher<R = unknown> {
  toIterator(items: readonly unknown[]): R;
}

declare global {
  namespace Vi {
    interface Assertion extends ToIteratorMatcher {}
  }
}
