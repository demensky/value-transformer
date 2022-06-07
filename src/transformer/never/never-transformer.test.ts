import type {TestFn} from 'ava';
import anyTest from 'ava';

import type {ValueTransformer} from '../../base/value-transformer.js';
import {NeverTransformerError} from '../../error/never-transformer-error.js';

import {NeverTransformer} from './never-transformer.js';

const test = anyTest as TestFn<ValueTransformer<never, never>>;

test.beforeEach((t) => {
  t.context = new NeverTransformer();
});

test('compatibleWith return false', (t) => {
  t.false(t.context.compatibleWith(null));
});

test('fromLiteral throw error', (t) => {
  t.throws(() => {
    t.context.fromLiteral(null);
  }, new NeverTransformerError());
});

test('toLiteral throw error', (t) => {
  t.throws(() => {
    t.context.toLiteral(null as never);
  }, new NeverTransformerError());
});
