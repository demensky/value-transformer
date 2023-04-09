import {expect, test} from 'vitest';

import {asFloat64} from '../../float64/as-float64.js';
import {Float64Transformer} from '../../float64/float64-transformer.js';
import {asString} from '../../string/as-string.js';
import {StringTransformer} from '../../string/string-transformer.js';

import {extractTransformableFields} from './extract-transformable-fields.js';

test('simple', () => {
  class Foo {
    @asString() public a = '';

    @asFloat64() public b = 0;
  }

  expect(extractTransformableFields(Foo.prototype)).toStrictEqual([
    ['a', new StringTransformer()],
    ['b', new Float64Transformer()],
  ]);

  expect(extractTransformableFields(Foo.prototype)).toStrictEqual([
    ['a', new StringTransformer()],
    ['b', new Float64Transformer()],
  ]);
});

test('extends', () => {
  class Foo {
    @asString() public a = '';
  }

  expect(extractTransformableFields(Foo.prototype)).toStrictEqual([
    ['a', new StringTransformer()],
  ]);

  expect(extractTransformableFields(Foo.prototype)).toStrictEqual([
    ['a', new StringTransformer()],
  ]);

  class Bar extends Foo {
    @asFloat64() public b = 0;
  }

  expect(extractTransformableFields(Bar.prototype)).toStrictEqual([
    ['a', new StringTransformer()],
    ['b', new Float64Transformer()],
  ]);

  expect(extractTransformableFields(Bar.prototype)).toStrictEqual([
    ['a', new StringTransformer()],
    ['b', new Float64Transformer()],
  ]);
});

test('extends with skip', () => {
  class Foo {
    @asString() public a = '';
  }

  class Bar extends Foo {}

  class Baz extends Bar {
    @asFloat64() public b = 0;
  }

  expect(extractTransformableFields(Baz.prototype)).toStrictEqual([
    ['a', new StringTransformer()],
    ['b', new Float64Transformer()],
  ]);

  expect(extractTransformableFields(Baz.prototype)).toStrictEqual([
    ['a', new StringTransformer()],
    ['b', new Float64Transformer()],
  ]);
});

test('empty', () => {
  class Foo {}

  expect(extractTransformableFields(Foo.prototype)).toStrictEqual([]);
});
