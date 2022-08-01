/* istanbul ignore file */

import {BufferSourceIterableReader} from '../src/buffer-reader/buffer-source-iterable-reader.js';
import type {DecoderGeneratorFactory} from '../src/type/decoder-generator-factory.js';
import type {EncodeFactory} from '../src/type/encode-factory.js';

export function createEncoderDecoder<T>(
  encoder: EncodeFactory<T>,
  decoder: DecoderGeneratorFactory<T>,
): (value: T) => T {
  return (value) =>
    BufferSourceIterableReader.from(encoder(value)).finalRead(decoder());
}
