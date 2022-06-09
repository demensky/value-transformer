/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type {ExecutionContext} from 'ava';

import type {DecoderGenerator} from '../src/index.js';

export function macroDecoder<T>(
  t: ExecutionContext<DecoderGenerator<T>>,
  chunks: readonly (readonly number[])[],
  data: T,
): void {
  let request: IteratorResult<number, T> = t.context.next();
  let index = 0;

  for (; request.done !== true && index < chunks.length; index++) {
    const byteLength: number = request.value;

    t.is(byteLength, chunks[index]!.length, `Wrong length of chunk ${index}`);

    request = t.context.next(
      new DataView(new Uint8Array(chunks[index]!).buffer),
    );
  }

  t.true(request.done);
  t.is(index, chunks.length, 'Wrong chunks count');
  t.is(request.value, data, 'Wrong data');
}
