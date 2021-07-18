import {asBoolean} from './as-boolean';
import {BooleanTransformer} from './boolean-transformer';

test('asBoolean return BooleanTransformer instance', () => {
  expect(asBoolean()).toBeInstanceOf(BooleanTransformer);
});
