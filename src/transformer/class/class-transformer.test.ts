/* eslint-disable @typescript-eslint/no-extraneous-class */

import 'reflect-metadata';
import '../../jest/to-be-compatible-with';
import '../../jest/to-be-transformation';

import {asMock} from '../mock/as-mock';
import {asNullable} from '../nullable/as-nullable';

import {ClassTransformer} from './class-transformer';
import {field} from './field';

describe('ClassTransformer', () => {
  test('fromConstructor create ClassTransformer instance', () => {
    class Tmp {}

    expect(ClassTransformer.fromConstructor(Tmp)).toBeInstanceOf(
      ClassTransformer,
    );
  });

  test('compatibleWith', () => {
    class Tmp {}

    expect(ClassTransformer.fromConstructor(Tmp)).toBeCompatibleWith(new Tmp());
  });

  test('empty class', () => {
    class Tmp {}

    expect(ClassTransformer.fromConstructor(Tmp)).toBeTransformation(
      new Tmp(),
      {},
      [],
    );
  });

  test('class with fields', () => {
    class Tmp {
      @field(asMock(true, 'a data', 'a compactLiteral', 'a literal'))
      public a: unknown = 'a data';

      @field(asMock(true, 'b data', 'b compactLiteral', 'b literal'))
      public b: unknown = 'b data';
    }

    expect(ClassTransformer.fromConstructor(Tmp)).toBeTransformation(
      new Tmp(),
      {a: 'a literal', b: 'b literal'},
      ['a compactLiteral', 'b compactLiteral'],
    );
  });

  test('recursive class', () => {
    class Tmp {
      @field(asMock(true, 'a data', 'a compactLiteral', 'a literal'))
      public a: unknown = 'a data';

      @field(asNullable(ClassTransformer.fromConstructor(Tmp)))
      public b: Tmp | null;

      @field(asMock(true, 'c data', 'c compactLiteral', 'c literal'))
      public c: unknown = 'c data';

      public constructor(b: Tmp['b']) {
        this.b = b;
      }
    }

    expect(ClassTransformer.fromConstructor(Tmp)).toBeTransformation(
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
});
