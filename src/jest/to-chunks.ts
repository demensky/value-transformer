/* istanbul ignore file */

import {diff} from 'jest-diff';
import {matcherHint} from 'jest-matcher-utils';

import type {IterableEncoding} from '../type/iterable-encoding';

expect.extend({
  toChunks(
    this: jest.MatcherContext,
    rawReceived: IterableEncoding,
    rawExpected: readonly (readonly number[])[],
  ): jest.CustomMatcherResult {
    const received: Uint8Array[] = Array.from<ArrayBufferView, Uint8Array>(
      rawReceived,
      (chunk) =>
        new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength),
    );

    const expected: Uint8Array[] = Array.from<readonly number[], Uint8Array>(
      rawExpected,
      (chunk) => new Uint8Array(chunk),
    );

    return {
      pass: this.equals(received, expected, [], true),
      message: () => {
        const hint: string = matcherHint('toChunks', 'transformer', 'data', {
          isNot: this.isNot,
        });

        const diffString: string | null = diff(expected, received, {
          expand: this.expand,
        });

        return `${hint}\n\n${diffString ?? ''}`;
      },
    };
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toChunks(chunks: readonly (readonly number[])[]): R;
    }
  }
}
