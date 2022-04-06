import '../../jest/to-be-compatible-with';
import '../../jest/to-be-transformation';

import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';

import {BooleanTransformer} from './boolean-transformer';

describe('BooleanTransformer', () => {
  let transformer: BooleanTransformer;

  beforeAll(() => {
    transformer = new BooleanTransformer();
  });

  test('invalid', () => {
    expect(transformer).not.toBeCompatibleWith(42);
    expect(() => {
      transformer.fromLiteral(42);
    }).toThrow(IncompatibleLiteralError);
  });

  describe('valid', () => {
    test('false', () => {
      expect(transformer).toBeCompatibleWith(false);
      expect(transformer).toBeTransformation(false, false, 0, [0x00]);
    });

    test('true', () => {
      expect(transformer).toBeCompatibleWith(true);
      expect(transformer).toBeTransformation(true, true, 1, [0x01]);
    });
  });
});
