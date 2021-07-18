import {asString} from './as-string';
import {StringTransformer} from './string-transformer';

test('asString return StringTransformer instance', () => {
  expect(asString()).toBeInstanceOf(StringTransformer);
});
