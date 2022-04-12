import '../src/jest/to-be-transformation';

import {asArray, asClass, asNullable, asUnion, transform} from '../src';
import {asMock} from '../src/transformer/mock/as-mock';

describe('recursive transformers', () => {
  test('self-used class in nullable field', () => {
    class Tmp {
      @transform(asMock(true, 'a-d', 'a-c', 'a-l')) public a = 'a-d';

      @transform(asNullable(asClass(Tmp))) public b: Tmp | null;

      @transform(asMock(true, 'c-d', 'c-c', 'c-l')) public c = 'c-d';

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
      @transform(asMock(true, 'a-d', 'a-c', 'a-l')) public a = 'a-d';

      @transform(asArray(asClass(Tmp))) public b: readonly Tmp[];

      @transform(asMock(true, 'c-d', 'c-c', 'c-l')) public c = 'c-d';

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
      @transform(asMock(true, 'name-d', 'name-c', 'name-l'))
      public name = 'name-d';
    }

    class Container {
      @transform(asUnion([asClass(Container), asClass(User)]))
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
