/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type {ExecutionContext} from 'ava';

import type {DecoderGenerator} from '../src/index.js';
import {InvalidBufferValueError} from '../src/index.js';

export function macroDecoderThrow(
  t: ExecutionContext<DecoderGenerator<unknown>>,
  chunks: readonly (readonly number[])[],
): void {
  t.throws(() => {
    let request: IteratorResult<number, unknown> = t.context.next();
    let index = 0;

    for (; request.done !== true && index < chunks.length; index++) {
      if (
        !t.is(
          request.value,
          chunks[index]!.length,
          `Wrong length of chunk ${index}`,
        )
      ) {
        return;
      }

      request = t.context.next(
        new DataView(new Uint8Array(chunks[index]!).buffer),
      );
    }
  }, new InvalidBufferValueError());
}
