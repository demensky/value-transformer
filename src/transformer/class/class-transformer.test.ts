import test from 'ava';

import {asMock} from '../../../test-util/as-mock.js';
import {toBeTransformation} from '../../../test-util/to-be-transformation.js';

import {ClassTransformer} from './class-transformer.js';
import {transform} from './decorator/transform.js';

test('compatibleWith true', (t) => {
  class Tmp {}

  t.true(ClassTransformer.fromConstructor(Tmp).compatibleWith(new Tmp()));
});

test('compatibleWith false', (t) => {
  class Tmp {}

  t.false(ClassTransformer.fromConstructor(Tmp).compatibleWith(new Date()));
});

test('empty class', (t) => {
  class Tmp {}

  toBeTransformation(
    t,
    ClassTransformer.fromConstructor(Tmp),
    new Tmp(),
    {},
    [],
  );
});

test('class with fields', (t) => {
  class Tmp {
    @transform(asMock(true, 'a-d', 'a-l', 'a-c')) public a = 'a-d';

    @transform(asMock(true, 'b-d', 'b-l', 'b-c')) public b = 'b-d';
  }

  toBeTransformation(
    t,
    ClassTransformer.fromConstructor(Tmp),
    new Tmp(),
    {a: 'a-l', b: 'b-l'},
    ['a-c', 'b-c'],
  );
});
