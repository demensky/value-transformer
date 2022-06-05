import '../../jest/to-be-compatible-with';
import '../../jest/to-be-transformation';

import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';

import {BooleanTransformer} from './boolean-transformer.js';

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
      expect(transformer).toBeTransformation(false, false, 0);
    });

    test('true', () => {
      expect(transformer).toBeCompatibleWith(true);
      expect(transformer).toBeTransformation(true, true, 1);
    });
  });
});
