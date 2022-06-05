import {asBoolean} from './as-boolean.js';
import {BooleanTransformer} from './boolean-transformer.js';

describe('asBoolean', () => {
  test('return BooleanTransformer instance', () => {
    expect(asBoolean()).toBeInstanceOf(BooleanTransformer);
  });
});
