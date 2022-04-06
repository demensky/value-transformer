import {deserialize} from '../../jest/deserialize';
import type {DecoderGenerator} from '../../type/decoder-generator';

import {uintDecoder} from './uint-decoder';

describe('uintDataViewDecoder', () => {
  let decoder: DecoderGenerator<number>;

  beforeEach(() => {
    decoder = uintDecoder();
  });

  test('smallest in one byte', () => {
    expect(deserialize([[0b0_0000000]], decoder)).toBe(0b0000000);
  });

  test('biggest in one byte', () => {
    expect(deserialize([[0b0_1111111]], decoder)).toBe(0b1111111);
  });

  test('smallest in two byte', () => {
    expect(deserialize([[0b1_0000000, 0b0_0000001]], decoder)).toBe(
      0b0000001_0000000,
    );
  });

  test('biggest in two byte', () => {
    expect(deserialize([[0b1_1111111, 0b0_1111111]], decoder)).toBe(
      0b1111111_1111111,
    );
  });

  test('smallest in three byte', () => {
    expect(
      deserialize([[0b1_0000000, 0b1_0000000, 0b0_0000001]], decoder),
    ).toBe(0b0000001_0000000_0000000);
  });

  test('biggest in three byte', () => {
    expect(
      deserialize([[0b1_1111111, 0b1_1111111, 0b0_1111111]], decoder),
    ).toBe(0b1111111_1111111_1111111);
  });

  test('max safe integer', () => {
    expect(
      deserialize(
        [
          [
            0b1_1111111, 0b1_1111111, 0b1_1111111, 0b1_1111111, 0b1_1111111,
            0b1_1111111, 0b1_1111111, 0b0_0001111,
          ],
        ],
        decoder,
      ),
    ).toBe(Number.MAX_SAFE_INTEGER);
  });
});
