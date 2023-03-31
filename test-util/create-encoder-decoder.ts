/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import {BufferSourceIterableReader} from '../src/buffer-reader/buffer-source-iterable-reader.js';
import {DataViewChunk} from '../src/data-view-chunk/data-view-chunk.js';
import type {DecoderGeneratorFactory} from '../src/type/decoder-generator-factory.js';
import type {Encoder} from '../src/type/encoder.js';

export function createEncoderDecoder<T>(
  encoder: Encoder<T>,
  decoder: DecoderGeneratorFactory<T>,
): (value: T) => T {
  return (value) =>
    BufferSourceIterableReader.from(
      DataViewChunk.encode(() => new ArrayBuffer(0x10000), encoder(value)),
    ).finalRead(decoder());
}
