import type {ExecutionContext} from 'ava';

import type {EncodeFactory} from '../src/type/encode-factory.js';

export function macroEncode<T>(
  t: ExecutionContext<EncodeFactory<T>>,
  data: T,
  chunks: readonly (readonly number[])[],
): void {
  t.deepEqual(
    Array.from<ArrayBufferView, ArrayBuffer>(
      t.context(data),
      ({buffer}) => buffer,
    ),
    Array.from<readonly number[], ArrayBuffer>(
      chunks,
      (chunk) => new Uint8Array(chunk).buffer,
    ),
  );
}
