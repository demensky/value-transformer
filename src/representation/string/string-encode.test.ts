import '../../jest/to-chunks';

import {InvalidUnicodeError} from '../../error/invalid-unicode-error';

import {stringEncode} from './string-encode';

describe('stringEncode', () => {
  test('empty string', () => {
    expect(stringEncode('')).toChunks([[0x00], []]);
  });

  test('simple string', () => {
    expect(stringEncode('foo')).toChunks([[0x03], [0x66, 0x6f, 0x6f]]);
  });

  test('broken unicode', () => {
    expect(() => {
      Array.from(stringEncode('\ud83d'));
    }).toThrow(InvalidUnicodeError);

    expect(() => {
      Array.from(stringEncode('\ud83d'));
    }).toThrow(InvalidUnicodeError);
  });

  // \u0000
  test('null', () => {
    expect(stringEncode('\0')).toChunks([[0x01], [0x00]]);
  });

  test('break line', () => {
    expect(stringEncode('\r\n')).toChunks([[0x02], [0x0d, 0x0a]]);
  });
});
