import {describe, expect, test} from '@jest/globals';

import {hexDataView} from './hex-data-view.js';

describe('invalid string', () => {
  test('upper case', () => {
    expect(() => {
      hexDataView('AB');
    }).toThrow('Wrong string');
  });

  test('unexpected symbols', () => {
    expect(() => {
      hexDataView('[0a');
    }).toThrow('Wrong string');
  });

  test('two byte without space', () => {
    expect(() => {
      hexDataView('0a0b');
    }).toThrow('Wrong string');
  });

  test('two byte with wrong space symbol', () => {
    expect(() => {
      hexDataView('0a-0b');
    }).toThrow('Wrong string');
  });
});

describe('valid string', () => {
  test('empty string return empty DataView', () => {
    expect(hexDataView('')).toStrictEqual(new DataView(new ArrayBuffer(0)));
  });

  test('spaced string return empty DataView', () => {
    expect(hexDataView(' \t\r\n')).toStrictEqual(
      new DataView(new ArrayBuffer(0)),
    );
  });

  test('simple byte', () => {
    expect(hexDataView('0a')).toStrictEqual(
      new DataView(new Uint8Array([0x0a]).buffer),
    );
  });

  test('spaced byte', () => {
    expect(hexDataView(' \t\r\n0a \t\r\n')).toStrictEqual(
      new DataView(new Uint8Array([0x0a]).buffer),
    );
  });

  test('simple two bytes', () => {
    expect(hexDataView('0a 0b')).toStrictEqual(
      new DataView(new Uint8Array([0x0a, 0x0b]).buffer),
    );
  });

  test('spaced two bytes', () => {
    expect(hexDataView(' \t\r\n0a \t\r\n0b \t\r\n')).toStrictEqual(
      new DataView(new Uint8Array([0x0a, 0x0b]).buffer),
    );
  });
});
