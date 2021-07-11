import {IncompatibleLiteralError} from '../error/incompatible-literal-error';

import {StringTransformer} from './string-transformer';

const TEST_ZERO_NUMBER = 0;
const TEST_ONE_NUMBER = 1;

const INVALID_VALUES = [
  null,
  undefined,
  TEST_ZERO_NUMBER,
  TEST_ONE_NUMBER,
  [],
  false,
  true,
] as const;

const VALID_VALUES = [
  '',
  '\0', // \u0000
  '\r\n',
  'foo',
  '\ud83d', // broken unicode
] as const;

describe('StringTransformer', () => {
  let transformer: StringTransformer;

  beforeAll(() => {
    transformer = new StringTransformer();
  });

  describe('compatibleWith', () => {
    test.each(INVALID_VALUES)('false %p', (data) => {
      expect(transformer.compatibleWith(data)).toBe(false);
    });

    test.each(VALID_VALUES)('true %j', (data) => {
      expect(transformer.compatibleWith(data)).toBe(true);
    });
  });

  describe('fromLiteral', () => {
    test.each(INVALID_VALUES)('%p', (data) => {
      expect(() => {
        transformer.fromLiteral(data);
      }).toThrow(IncompatibleLiteralError);
    });

    test.each(VALID_VALUES)('%j', (data) => {
      expect(transformer.fromLiteral(data)).toBe(data);
    });
  });

  describe('toLiteral', () => {
    test.each(VALID_VALUES)('%j', (data) => {
      expect(transformer.toLiteral(data)).toBe(data);
    });
  });
});
