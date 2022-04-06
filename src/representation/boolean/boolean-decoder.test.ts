import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error';
import {deserialize} from '../../jest/deserialize';
import type {DecoderGenerator} from '../../type/decoder-generator';

import {booleanDecoder} from './boolean-decoder';

describe('booleanDecoder', () => {
  let decoder: DecoderGenerator<boolean>;

  beforeEach(() => {
    decoder = booleanDecoder();
  });

  test('false', () => {
    expect(deserialize([[0b00000000]], decoder)).toBe(false);
  });

  test('true', () => {
    expect(deserialize([[0b00000001]], decoder)).toBe(true);
  });

  test('42', () => {
    expect(() => {
      deserialize([[0b00101010]], decoder);
    }).toThrow(InvalidBufferValueError);
  });
});
