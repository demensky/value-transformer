import {deserialize} from '../../jest/deserialize';
import type {DecoderGenerator} from '../../type/decoder-generator';

import {bigIntDecoder} from './big-int-decoder';

describe('bigIntDecoder', () => {
  let decoder: DecoderGenerator<bigint>;

  beforeEach(() => {
    decoder = bigIntDecoder();
  });

  describe('1 byte', () => {
    test('0', () => {
      expect(deserialize([[0b0_0000000]], decoder)).toBe(0n);
    });

    test('biggest positive', () => {
      expect(deserialize([[0b0_0111111]], decoder)).toBe(63n);
    });

    test('smallest positive', () => {
      expect(deserialize([[0b0_000001]], decoder)).toBe(1n);
    });

    test('biggest negative', () => {
      expect(deserialize([[0b0_1000000]], decoder)).toBe(-64n);
    });

    test('smallest negative', () => {
      expect(deserialize([[0b0_1111111]], decoder)).toBe(-1n);
    });
  });

  describe('2 bytes', () => {
    test('biggest positive', () => {
      expect(deserialize([[0b1_1111111, 0b0_0111111]], decoder)).toBe(8191n);
    });

    test('smallest positive', () => {
      expect(deserialize([[0b1_0000000, 0b0_0000001]], decoder)).toBe(128n);
    });

    test('biggest negative', () => {
      expect(deserialize([[0b1_0000000, 0b0_1000000]], decoder)).toBe(-8192n);
    });

    test('smallest negative', () => {
      expect(deserialize([[0b1_0111111, 0b0_1111111]], decoder)).toBe(-65n);
    });
  });
});
