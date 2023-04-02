import type {Decoder} from '../../type/decoder.js';
import type {Decoding} from '../../type/decoding.js';
import {booleanDecoder} from '../boolean/boolean-decoder.js';

export function* nullableDecoder<T>(decoder: Decoder<T>): Decoding<T | null> {
  return (yield* booleanDecoder()) ? yield* decoder() : null;
}
