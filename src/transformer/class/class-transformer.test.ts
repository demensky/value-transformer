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
      @field(asMock(true, 'a-d', 'a-c', 'a-l')) public a = 'a-d';

      @field(asMock(true, 'b-d', 'b-c', 'b-l')) public b = 'b-d';
    }

    expect(ClassTransformer.fromConstructor(Tmp)).toBeTransformation(
      new Tmp(),
      {a: 'a-l', b: 'b-l'},
      ['a-c', 'b-c'],
    );
  });
});
