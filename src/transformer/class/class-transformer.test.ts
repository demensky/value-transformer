/* eslint-disable @typescript-eslint/no-extraneous-class,@typescript-eslint/no-empty-interface,@typescript-eslint/no-redeclare */

import 'reflect-metadata';
import '../../jest/to-be-compact-transformation';
import '../../jest/to-be-compatible-with';
import '../../jest/to-be-transformation';

import {asMock} from '../mock/as-mock';
import type {MockTransformer} from '../mock/mock-transformer';
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

  describe('empty class', () => {
    interface Tmp {}

    let Tmp: new () => Tmp;
    let transformer: ClassTransformer<Tmp>;

    beforeEach(() => {
      Tmp = class {};

      transformer = ClassTransformer.fromConstructor(Tmp);
    });

    test('normal', () => {
      expect(transformer).toBeTransformation(new Tmp(), {});
    });

    test('compact', () => {
      expect(transformer).toBeCompactTransformation(new Tmp(), []);
    });
  });

  describe('class with fields', () => {
    interface Tmp {
      a: unknown;
      b: unknown;
    }

    let Tmp: new () => Tmp;
    let transformer: ClassTransformer<Tmp>;
    let transformerA: MockTransformer<unknown, unknown>;
    let transformerB: MockTransformer<unknown, unknown>;

    beforeEach(() => {
      transformerA = asMock(
        true,
        'a data',
        true,
        'a compactLiteral',
        'a literal',
      );
      transformerB = asMock(
        true,
        'b data',
        true,
        'b compactLiteral',
        'b literal',
      );

      class TmpClass {
        @field(transformerA) public a: unknown = 'a data';

        @field(transformerB) public b: unknown = 'b data';
      }

      Tmp = TmpClass;
      transformer = ClassTransformer.fromConstructor(Tmp);
    });

    test('normal', () => {
      expect(transformer).toBeTransformation(new Tmp(), {
        a: 'a literal',
        b: 'b literal',
      });
    });

    test('compact', () => {
      expect(transformer).toBeCompactTransformation(new Tmp(), [
        'a compactLiteral',
        'b compactLiteral',
      ]);
    });
  });

  describe('recursive class', () => {
    interface Tmp {
      a: unknown;
      b: Tmp | null;
      c: unknown;
    }

    let transformerA: MockTransformer<unknown, unknown>;
    let transformerC: MockTransformer<unknown, unknown>;

    let Tmp: new (b: Tmp['b']) => Tmp;
    let transformer: ClassTransformer<Tmp>;

    let data: Tmp;

    beforeEach(() => {
      transformerA = asMock(
        true,
        'a data',
        true,
        'a compactLiteral',
        'a literal',
      );
      transformerC = asMock(
        true,
        'c data',
        true,
        'c compactLiteral',
        'c literal',
      );

      class TmpClass {
        @field(transformerA) public a: unknown = 'a data';

        @field(asNullable(ClassTransformer.fromConstructor(TmpClass)))
        public b: TmpClass | null;

        @field(transformerC) public c: unknown = 'c data';

        public constructor(b: TmpClass['b']) {
          this.b = b;
        }
      }

      Tmp = TmpClass;
      transformer = ClassTransformer.fromConstructor(Tmp);

      data = new Tmp(new Tmp(null));
    });

    test('normal', () => {
      expect(transformer).toBeTransformation(data, {
        a: 'a literal',
        b: {a: 'a literal', b: null, c: 'c literal'},
        c: 'c literal',
      });
    });

    test('compact', () => {
      expect(transformer).toBeCompactTransformation(data, [
        'a compactLiteral',
        ['a compactLiteral', null, 'c compactLiteral'],
        'c compactLiteral',
      ]);
    });
  });
});
