import type {ExecutionContext} from 'ava';

import type {DecoderGenerator} from '../src/index.js';
import {InvalidBufferValueError, SyncBufferDeserializer} from '../src/index.js';
import {map} from '../src/util/map.js';

export function macroDecoderThrow(
  t: ExecutionContext<DecoderGenerator<unknown>>,
  chunks: readonly (readonly number[])[],
): void {
  t.throws(() => {
    SyncBufferDeserializer.from(
      map(chunks, (elements) => new Uint8Array(elements)),
    ).finalRead<unknown>(t.context);
  }, new InvalidBufferValueError());
}
