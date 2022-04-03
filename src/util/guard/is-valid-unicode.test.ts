import {isValidUnicode} from './is-valid-unicode';

describe('isValidUnicode', () => {
  describe('valid', () => {
    test('empty string', () => {
      expect(isValidUnicode('')).toBe(true);
    });

    test('simple string', () => {
      expect(isValidUnicode('a')).toBe(true);
    });

    test('paired surrogates', () => {
      expect(isValidUnicode('a\uD83D\uDE0Ab')).toBe(true);
    });

    test('only paired surrogates', () => {
      expect(isValidUnicode('\uD83D\uDE0A')).toBe(true);
    });
  });

  describe('invalid', () => {
    test('unpaired low surrogates', () => {
      expect(isValidUnicode('a\uD800b')).toBe(false);
      expect(isValidUnicode('a\uD83Db')).toBe(false);
      expect(isValidUnicode('a\uDBFFb')).toBe(false);
    });

    test('only unpaired low surrogates', () => {
      expect(isValidUnicode('\uD800')).toBe(false);
      expect(isValidUnicode('\uD83D')).toBe(false);
      expect(isValidUnicode('\uDBFF')).toBe(false);
    });

    test('unpaired high surrogates', () => {
      expect(isValidUnicode('a\uDC00b')).toBe(false);
      expect(isValidUnicode('a\uDE0Ab')).toBe(false);
      expect(isValidUnicode('a\uDFFFb')).toBe(false);
    });

    test('only unpaired high surrogates', () => {
      expect(isValidUnicode('\uDC00')).toBe(false);
      expect(isValidUnicode('\uDE0A')).toBe(false);
      expect(isValidUnicode('\uDFFF')).toBe(false);
    });
  });
});
