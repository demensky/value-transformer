import '../../jest/to-be-compatible-with';
import '../../jest/to-be-transformation';

import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';

import {StringTransformer} from './string-transformer.js';

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

  test('empty string', () => {
    expect(transformer).toBeTransformation('', '', '');
  });

  test('simple string', () => {
    expect(transformer).toBeTransformation('foo', 'foo', 'foo');
  });

  test('broken unicode', () => {
    expect(() => {
      transformer.toLiteral('\ud83d');
    }).toThrow(InvalidUnicodeError);
  });

  // \u0000
  test('null', () => {
    expect(transformer).toBeTransformation('\0', '\0', '\0');
  });

  test('break line', () => {
    expect(transformer).toBeTransformation('\r\n', '\r\n', '\r\n');
  });
});
