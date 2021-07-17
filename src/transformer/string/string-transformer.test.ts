import '../../jest/to-be-compact-transformation';
import '../../jest/to-be-compatible-with';
import '../../jest/to-be-transformation';

import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';

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

  describe.each(INVALID_VALUES)('invalid %p', (data) => {
    test('compatible', () => {
      expect(transformer).not.toBeCompatibleWith(data);
    });

    test('fromLiteral', () => {
      expect(() => {
        transformer.fromLiteral(data);
      }).toThrow(IncompatibleLiteralError);
    });
  });

  describe.each(VALID_VALUES)('valid %p', (data) => {
    test('compatible', () => {
      expect(transformer).toBeCompatibleWith(data);
    });

    test('normal', () => {
      expect(transformer).toBeTransformation(data, data);
    });

    test('compact', () => {
      expect(transformer).toBeCompactTransformation(data, data);
    });
  });
});
