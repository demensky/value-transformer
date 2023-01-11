import {describe, expect, test} from 'vitest';

import {hexUint8} from './hex-uint8.js';

describe('invalid string', () => {
  test('upper case', () => {
    expect(() => {
      hexUint8('AB');
    }).toThrow('Wrong string');
  });

  test('unexpected symbols', () => {
    expect(() => {
      hexUint8('[0a');
    }).toThrow('Wrong string');
  });

  test('two byte without space', () => {
    expect(() => {
      hexUint8('0a0b');
    }).toThrow('Wrong string');
  });

  test('two byte with wrong space symbol', () => {
    expect(() => {
      hexUint8('0a-0b');
    }).toThrow('Wrong string');
  });
});

describe('valid string', () => {
  test('empty string return empty DataView', () => {
    expect(hexUint8('')).toStrictEqual(new Uint8Array(0));
  });

  test('spaced string return empty DataView', () => {
    expect(hexUint8(' \t\r\n')).toStrictEqual(new Uint8Array(0));
  });

  test('simple byte', () => {
    expect(hexUint8('0a')).toStrictEqual(new Uint8Array([0x0a]));
  });

  test('spaced byte', () => {
    expect(hexUint8(' \t\r\n0a \t\r\n')).toStrictEqual(new Uint8Array([0x0a]));
  });

  test('simple two bytes', () => {
    expect(hexUint8('0a 0b')).toStrictEqual(new Uint8Array([0x0a, 0x0b]));
  });

  test('spaced two bytes', () => {
    expect(hexUint8(' \t\r\n0a \t\r\n0b \t\r\n')).toStrictEqual(
      new Uint8Array([0x0a, 0x0b]),
    );
  });
});
