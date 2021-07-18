import '../../jest/to-be-compact-transformation';
import '../../jest/to-be-compatible-with';
import '../../jest/to-be-transformation';

import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';

import {BooleanTransformer} from './boolean-transformer';

describe('BooleanTransformer', () => {
  let transformer: BooleanTransformer;

  beforeAll(() => {
    transformer = new BooleanTransformer();
  });

  describe.each([null, undefined, 2, 3, [], {}] as const)(
    'valid %p',
    (value) => {
      test('compatible', () => {
        expect(transformer).not.toBeCompatibleWith(value);
      });

      test('fromLiteral', () => {
        expect(() => {
          transformer.fromLiteral(value);
        }).toThrow(IncompatibleLiteralError);
      });
    },
  );

  describe.each([
    [true, 1],
    [false, 0],
  ])('valid %p', (value, compactLiteral) => {
    test('compatible', () => {
      expect(transformer).toBeCompatibleWith(value);
    });

    test('normal', () => {
      expect(transformer).toBeTransformation(value, value);
    });

    test('compact', () => {
      expect(transformer).toBeCompactTransformation(value, compactLiteral);
    });
  });
});