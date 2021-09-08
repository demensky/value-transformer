import {asBoolean} from './as-boolean';
import {BooleanTransformer} from './boolean-transformer';

describe('asBoolean', () => {
  test('return BooleanTransformer instance', () => {
    expect(asBoolean()).toBeInstanceOf(BooleanTransformer);
  });
});
