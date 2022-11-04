/* istanbul ignore file */

import type {Mock} from 'vitest';
import {vi} from 'vitest';

import {uint8Decoder} from '../src/coder/uint8/uint8-decoder.js';

export function mockByteDecoder(): Mock<
  Parameters<typeof uint8Decoder>,
  ReturnType<typeof uint8Decoder>
> {
  return vi.fn(uint8Decoder);
}
