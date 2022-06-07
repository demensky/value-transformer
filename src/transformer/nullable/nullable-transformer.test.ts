import test from 'ava';

import {asMock} from '../../../test-util/as-mock.js';
import {toBeTransformation} from '../../../test-util/to-be-transformation.js';

import {NullableTransformer} from './nullable-transformer.js';

test('null value', (t) => {
  toBeTransformation(
    t,
    new NullableTransformer(asMock(true, null, null, null)),
    null,
    null,
    null,
  );
});

test('not null value', (t) => {
  toBeTransformation(
    t,
    new NullableTransformer(asMock(true, 'a-d', 'a-l', 'a-c')),
    'a-d',
    'a-l',
    'a-c',
  );
});
