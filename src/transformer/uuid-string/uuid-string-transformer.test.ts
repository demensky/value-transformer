import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroTransformation} from '../../../test-util/macro-transformation.js';
import type {UuidString} from '../../type/uuid-string.js';

import {UuidStringTransformer} from './uuid-string-transformer.js';

const test = anyTest as TestFn<UuidStringTransformer<UuidString>>;

test.beforeEach((t) => {
  t.context = new UuidStringTransformer<UuidString>();
});

test(
  'simple',
  macroTransformation,
  '00112233-4455-6677-8899-aabbccddeeff' as UuidString,
);

test(
  'nil UUID',
  macroTransformation,
  '00000000-0000-0000-0000-000000000000' as UuidString,
);

test(
  'max UUID',
  macroTransformation,
  'ffffffff-ffff-ffff-ffff-ffffffffffff' as UuidString,
);
