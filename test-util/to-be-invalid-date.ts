/* istanbul ignore file */

import {expect} from 'vitest';

import {isDate} from '../src/util/guard/is-date.js';
import {isInvalidDate} from '../src/util/guard/is-invalid-date.js';

// TODO remove after https://github.com/vitest-dev/vitest/issues/2319

expect.extend({
  toBeInvalidDate(actual: unknown) {
    return {
      pass: isDate(actual) && isInvalidDate(actual),
      message: () => {
        const actualString: string = this.utils.stringify(actual, undefined, {
          min: true,
        });

        return this.isNot
          ? `expected ${actualString} not to be Date { NaN }`
          : `expected ${actualString} to be Date { NaN }`;
      },
      expected: new Date(NaN),
      actual,
    };
  },
});

interface ToBeInvalidDateMatcher<R = unknown> {
  toBeInvalidDate(): R;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Assertion extends ToBeInvalidDateMatcher {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface AsymmetricMatchersContaining extends ToBeInvalidDateMatcher {}
  }
}
