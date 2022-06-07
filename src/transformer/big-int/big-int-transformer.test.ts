import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroTransformation} from '../../../test-util/macro-transformation.js';

import {BigIntTransformer} from './big-int-transformer.js';

const test = anyTest as TestFn<BigIntTransformer>;

test.beforeEach((t) => {
  t.context = new BigIntTransformer();
});

test('0n', macroTransformation, 0n, '0', '0');

test('1n', macroTransformation, 1n, '1', '1');

test('42n', macroTransformation, 42n, '42', '42');

test(
  '9007199254740991n',
  macroTransformation,
  9007199254740991n,
  '9007199254740991',
  '9007199254740991',
);

test(
  '18446744073709551615n',
  macroTransformation,
  18446744073709551615n,
  '18446744073709551615',
  '18446744073709551615',
);

test(
  '340282366920938463463374607431768211455n',
  macroTransformation,
  340282366920938463463374607431768211455n,
  '340282366920938463463374607431768211455',
  '340282366920938463463374607431768211455',
);

test('-1n', macroTransformation, -1n, '-1', '-1');

test('-42n', macroTransformation, -42n, '-42', '-42');

test(
  '-9007199254740991n',
  macroTransformation,
  -9007199254740991n,
  '-9007199254740991',
  '-9007199254740991',
);

test(
  '-18446744073709551615n',
  macroTransformation,
  -18446744073709551615n,
  '-18446744073709551615',
  '-18446744073709551615',
);

test(
  '-340282366920938463463374607431768211455n',
  macroTransformation,
  -340282366920938463463374607431768211455n,
  '-340282366920938463463374607431768211455',
  '-340282366920938463463374607431768211455',
);
