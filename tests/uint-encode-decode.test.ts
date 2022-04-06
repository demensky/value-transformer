import {SyncBufferDeserializer} from '../src';
import {uintDecoder} from '../src/representation/uint/uint-decoder';
import {uintEncode} from '../src/representation/uint/uint-encode';

function encodeDecodeUint(value: number): number {
  return SyncBufferDeserializer.from(uintEncode(value)).finalRead(
    uintDecoder(),
  );
}

describe('uint encode decode', () => {
  test('smallest in one byte', () => {
    const value = 0b0000000;

    expect(encodeDecodeUint(value)).toBe(value);
  });

  test('biggest in one byte', () => {
    const value = 0b1111111;

    expect(encodeDecodeUint(value)).toBe(value);
  });

  test('smallest in two byte', () => {
    const value = 0b1_0000000;

    expect(encodeDecodeUint(value)).toBe(value);
  });

  test('biggest in two byte', () => {
    const value = 0b1111111_1111111;

    expect(encodeDecodeUint(value)).toBe(value);
  });

  test('smallest in three byte', () => {
    const value = 0b1_0000000_0000000;

    expect(encodeDecodeUint(value)).toBe(value);
  });

  test('biggest in three byte', () => {
    const value = 0b1111111_1111111_1111111;

    expect(encodeDecodeUint(value)).toBe(value);
  });

  test('max safe integer', () => {
    const value = Number.MAX_SAFE_INTEGER;

    expect(encodeDecodeUint(value)).toBe(value);
  });
});
