import test from 'ava';

import {asMock} from '../../../test-util/as-mock.js';
import {toBeTransformation} from '../../../test-util/to-be-transformation.js';

import {NullableTransformer} from './nullable-transformer.js';

test('null value', (t) => {
  toBeTransformation(
    t,
    new NullableTransformer(asMock(true, 'a-d', [0x0a], 'a-l', 'a-c')),
    null,
    [0x00],
  );
});

test('not null value', (t) => {
  toBeTransformation(
    t,
    new NullableTransformer(asMock(true, 'a-d', [0x0a], 'a-l', 'a-c')),
    'a-d',
    [0x01, 0x0a],
    'a-l',
    'a-c',
  );
});
