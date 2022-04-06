/* istanbul ignore file */

import {SyncBufferDeserializer} from '../buffer-deserializer/sync-buffer-deserializer';
import type {DecoderGenerator} from '../type/decoder-generator';
import {map} from '../util/map';

export function deserialize<T>(
  chunks: readonly (readonly number[])[],
  decoder: DecoderGenerator<T>,
): T {
  return SyncBufferDeserializer.from(
    map(chunks, (elements) => new Uint8Array(elements)),
  ).finalRead(decoder);
}
