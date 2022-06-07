import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroTransformation} from '../../../test-util/macro-transformation.js';

import {BooleanTransformer} from './boolean-transformer.js';

const test = anyTest as TestFn<BooleanTransformer>;

test.beforeEach((t) => {
  t.context = new BooleanTransformer();
});

test('true', macroTransformation, true, true, 1);

test('false', macroTransformation, false, false, 0);
