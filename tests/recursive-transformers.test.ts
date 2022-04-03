import 'reflect-metadata';
import '../src/jest/to-be-transformation';

import {asArray, asClass, asNullable, asUnion, field} from '../src';
import {asMock} from '../src/transformer/mock/as-mock';

describe('recursive transformers', () => {
  test('self-used class in nullable field', () => {
    class Tmp {
      @field(asMock(true, 'a data', 'a compactLiteral', 'a literal'))
      public a: unknown = 'a data';

      @field(asNullable(asClass(Tmp))) public b: Tmp | null;

      @field(asMock(true, 'c data', 'c compactLiteral', 'c literal'))
      public c: unknown = 'c data';

      public constructor(b: Tmp['b']) {
        this.b = b;
      }
    }

    expect(asClass(Tmp)).toBeTransformation(
      new Tmp(new Tmp(null)),
      {
        a: 'a literal',
        b: {a: 'a literal', b: null, c: 'c literal'},
        c: 'c literal',
      },
      [
        'a compactLiteral',
        ['a compactLiteral', null, 'c compactLiteral'],
        'c compactLiteral',
      ],
    );
  });

  test('self-used class in field with array', () => {
    class Tmp {
      @field(asMock(true, 'a data', 'a compactLiteral', 'a literal'))
      public a: unknown = 'a data';

      @field(asArray(asClass(Tmp))) public b: readonly Tmp[];

      @field(asMock(true, 'c data', 'c compactLiteral', 'c literal'))
      public c: unknown = 'c data';

      public constructor(b: Tmp['b']) {
        this.b = b;
      }
    }

    expect(asClass(Tmp)).toBeTransformation(
      new Tmp([new Tmp([])]),
      {
        a: 'a literal',
        b: [{a: 'a literal', b: [], c: 'c literal'}],
        c: 'c literal',
      },
      [
        'a compactLiteral',
        [['a compactLiteral', [], 'c compactLiteral']],
        'c compactLiteral',
      ],
    );
  });

  test('self-used class in field with union', () => {
    class User {
      @field(asMock(true, 'name data', 'name compactLiteral', 'name literal'))
      public name: unknown = 'name data';
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
      {child: {is: 0, value: {child: {is: 1, value: {name: 'name literal'}}}}},
      [[0, [[1, ['name compactLiteral']]]]],
    );
  });
});
