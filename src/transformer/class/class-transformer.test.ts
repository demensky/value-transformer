/* eslint-disable @typescript-eslint/no-extraneous-class */

import 'reflect-metadata';
import '../../jest/to-be-compatible-with';
import '../../jest/to-be-transformation';

import {asMock} from '../mock/as-mock';

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
});
