import '../../jest/to-chunks';

import {uintEncode} from './uint-encode';

describe('uintEncode', () => {
  test('smallest in one byte', () => {
    expect(uintEncode(0)).toChunks([[0x00]]);
  });

  test('biggest in one byte', () => {
    expect(uintEncode(127)).toChunks([[0x7f]]);
  });

  test('smallest in two byte', () => {
    expect(uintEncode(128)).toChunks([[0x80, 0x01]]);
  });

  test('biggest in two byte', () => {
    expect(uintEncode(16383)).toChunks([[0xff, 0x7f]]);
  });

  test('smallest in three byte', () => {
    expect(uintEncode(16384)).toChunks([[0x80, 0x80, 0x01]]);
  });

  test('biggest in three byte', () => {
    expect(uintEncode(2097151)).toChunks([[0xff, 0xff, 0x7f]]);
  });

  test('max safe integer', () => {
    expect(uintEncode(Number.MAX_SAFE_INTEGER)).toChunks([
      [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x0f],
    ]);
  });
});
