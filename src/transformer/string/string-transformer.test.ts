import '../../jest/to-be-compact-transformation';
import '../../jest/to-be-compatible-with';
import '../../jest/to-be-transformation';

import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';

import {StringTransformer} from './string-transformer';

describe('StringTransformer', () => {
  let transformer: StringTransformer;

  beforeAll(() => {
    transformer = new StringTransformer();
  });

  describe.each([null, undefined, 0, 1, [], false, true])(
    'invalid %p',
    (data) => {
      test('compatible', () => {
        expect(transformer).not.toBeCompatibleWith(data);
      });

      test('fromLiteral', () => {
        expect(() => {
          transformer.fromLiteral(data);
        }).toThrow(new IncompatibleLiteralError('only strings are supported'));
      });
    },
  );

  describe.each([
    '',
    '\0', // \u0000
    '\r\n',
    'foo',
    '\ud83d', // broken unicode
  ])('valid %p', (data) => {
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
