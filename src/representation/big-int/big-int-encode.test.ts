import '../../jest/to-chunks';

import {bigIntEncode} from './big-int-encode';

describe('bigIntEncode', () => {
  describe('1 byte', () => {
    test('0', () => {
      expect(bigIntEncode(0n)).toChunks([[0x00]]);
    });

    test('biggest positive', () => {
      expect(bigIntEncode(63n)).toChunks([[0x3f]]);
    });

    test('smallest positive', () => {
      expect(bigIntEncode(1n)).toChunks([[0x01]]);
    });

    test('biggest negative', () => {
      expect(bigIntEncode(-64n)).toChunks([[0x40]]);
    });

    test('smallest negative', () => {
      expect(bigIntEncode(-1n)).toChunks([[0x7f]]);
    });
  });

  describe('2 bytes', () => {
    test('biggest positive', () => {
      expect(bigIntEncode(8191n)).toChunks([[0xff, 0x3f]]);
    });

    test('smallest positive', () => {
      expect(bigIntEncode(128n)).toChunks([[0x80, 0x01]]);
    });

    test('biggest negative', () => {
      expect(bigIntEncode(-8192n)).toChunks([[0x80, 0x40]]);
    });

    test('smallest negative', () => {
      expect(bigIntEncode(-65n)).toChunks([[0xbf, 0x7f]]);
    });
  });
});
