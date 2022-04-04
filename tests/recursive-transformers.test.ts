import 'reflect-metadata';
import '../src/jest/to-be-transformation';

import {asArray, asClass, asNullable, asUnion, field} from '../src';
import {asMock} from '../src/transformer/mock/as-mock';

describe('recursive transformers', () => {
  test('self-used class in nullable field', () => {
    class Tmp {
      @field(asMock(true, 'a-d', 'a-c', 'a-l')) public a = 'a-d';

      @field(asNullable(asClass(Tmp))) public b: Tmp | null;

      @field(asMock(true, 'c-d', 'c-c', 'c-l')) public c = 'c-d';

      public constructor(b: Tmp['b']) {
        this.b = b;
      }
    }

    expect(asClass(Tmp)).toBeTransformation(
      new Tmp(new Tmp(null)),
      {a: 'a-l', b: {a: 'a-l', b: null, c: 'c-l'}, c: 'c-l'},
      ['a-c', ['a-c', null, 'c-c'], 'c-c'],
    );
  });

  test('self-used class in field with array', () => {
    class Tmp {
      @field(asMock(true, 'a-d', 'a-c', 'a-l')) public a = 'a-d';

      @field(asArray(asClass(Tmp))) public b: readonly Tmp[];

      @field(asMock(true, 'c-d', 'c-c', 'c-l')) public c = 'c-d';

      public constructor(b: Tmp['b']) {
        this.b = b;
      }
    }

    expect(asClass(Tmp)).toBeTransformation(
      new Tmp([new Tmp([])]),
      {a: 'a-l', b: [{a: 'a-l', b: [], c: 'c-l'}], c: 'c-l'},
      ['a-c', [['a-c', [], 'c-c']], 'c-c'],
    );
  });

  test('self-used class in field with union', () => {
    class User {
      @field(asMock(true, 'name-d', 'name-c', 'name-l'))
      public name = 'name-d';
    }

    class Container {
      @field(asUnion([asClass(Container), asClass(User)]))
      public readonly child: Container | User;

      public constructor(b: Container['child']) {
        this.child = b;
      }
    }

    expect(asClass(Container)).toBeTransformation(
      new Container(new Container(new User())),
      {child: {is: 0, value: {child: {is: 1, value: {name: 'name-l'}}}}},
      [[0, [[1, ['name-c']]]]],
    );
  });
});
