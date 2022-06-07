import test from 'ava';

import {
  asArray,
  asClass,
  asNullable,
  asUnion,
  transform,
} from '../src/index.js';
import {asMock} from '../test-util/as-mock.js';
import {toBeTransformation} from '../test-util/to-be-transformation.js';

test('self-used class in nullable field', (t) => {
  class Tmp {
    @transform(asMock(true, 'a-d', 'a-l', 'a-c')) public a = 'a-d';

    @transform(asNullable(asClass(Tmp))) public b: Tmp | null;

    @transform(asMock(true, 'c-d', 'c-l', 'c-c')) public c = 'c-d';

    public constructor(b: Tmp['b']) {
      this.b = b;
    }
  }

  toBeTransformation(
    t,
    asClass(Tmp),
    new Tmp(new Tmp(null)),
    {a: 'a-l', b: {a: 'a-l', b: null, c: 'c-l'}, c: 'c-l'},
    ['a-c', ['a-c', null, 'c-c'], 'c-c'],
  );
});

test('self-used class in field with array', (t) => {
  class Tmp {
    @transform(asMock(true, 'a-d', 'a-l', 'a-c')) public a = 'a-d';

    @transform(asArray(asClass(Tmp))) public b: readonly Tmp[];

    @transform(asMock(true, 'c-d', 'c-l', 'c-c')) public c = 'c-d';

    public constructor(b: Tmp['b']) {
      this.b = b;
    }
  }

  toBeTransformation(
    t,
    asClass(Tmp),
    new Tmp([new Tmp([])]),
    {a: 'a-l', b: [{a: 'a-l', b: [], c: 'c-l'}], c: 'c-l'},
    ['a-c', [['a-c', [], 'c-c']], 'c-c'],
  );
});

test('self-used class in field with union', (t) => {
  class User {
    @transform(asMock(true, 'name-d', 'name-l', 'name-c'))
    public name = 'name-d';
  }

  class Container {
    @transform(asUnion([asClass(Container), asClass(User)]))
    public readonly child: Container | User;

    public constructor(b: Container['child']) {
      this.child = b;
    }
  }

  toBeTransformation(
    t,
    asClass(Container),
    new Container(new Container(new User())),
    {child: {is: 0, value: {child: {is: 1, value: {name: 'name-l'}}}}},
    [[0, [[1, ['name-c']]]]],
  );
});
