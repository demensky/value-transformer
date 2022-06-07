import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroTransformation} from '../../../test-util/macro-transformation.js';

import {Float64Transformer} from './float64-transformer.js';

const test = anyTest as TestFn<Float64Transformer>;

test.beforeEach((t) => {
  t.context = new Float64Transformer();
});

test('-Infinity', macroTransformation, -Infinity, '-Infinity', '-Infinity');

test('-Number.MAX_VALUE', macroTransformation, -Number.MAX_VALUE);

test('Number.MIN_SAFE_INTEGER', macroTransformation, Number.MIN_SAFE_INTEGER);

test('-Number.MIN_VALUE', macroTransformation, -Number.MIN_VALUE);

test('-0', macroTransformation, -0, '-0');

test('NaN', macroTransformation, NaN, 'NaN');

test('0', macroTransformation, 0);

test('Number.MIN_VALUE', macroTransformation, Number.MIN_VALUE);

test('Number.MAX_SAFE_INTEGER', macroTransformation, Number.MAX_SAFE_INTEGER);

test('Number.MAX_VALUE', macroTransformation, Number.MAX_VALUE);

test('Infinity', macroTransformation, Infinity, 'Infinity', 'Infinity');
