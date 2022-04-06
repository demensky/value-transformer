import '../../jest/to-be-transformation';

import {Float64Transformer} from './float64-transformer';

describe('Float64Transformer', () => {
  let transformer: Float64Transformer;

  beforeAll(() => {
    transformer = new Float64Transformer();
  });

  test('-Infinity', () => {
    expect(transformer).toBeTransformation(
      -Infinity,
      '-Infinity',
      '-Infinity',
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0xff],
    );
  });

  test('-Number.MAX_VALUE', () => {
    expect(transformer).toBeTransformation(
      -Number.MAX_VALUE,
      -Number.MAX_VALUE,
      -Number.MAX_VALUE,
      [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xef, 0xff],
    );
  });

  test('Number.MIN_SAFE_INTEGER', () => {
    expect(transformer).toBeTransformation(
      Number.MIN_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
      [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f, 0xc3],
    );
  });

  test('-Number.MIN_VALUE', () => {
    expect(transformer).toBeTransformation(
      -Number.MIN_VALUE,
      -Number.MIN_VALUE,
      -Number.MIN_VALUE,
      [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80],
    );
  });

  test('-0', () => {
    expect(transformer).toBeTransformation(
      -0,
      '-0',
      '-0',
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80],
    );
  });

  test('NaN', () => {
    expect(transformer).toBeTransformation(
      NaN,
      'NaN',
      'NaN',
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf8, 0x7f],
    );
  });

  test('0', () => {
    expect(transformer).toBeTransformation(
      0,
      0,
      0,
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
    );
  });

  test('Number.MIN_VALUE', () => {
    expect(transformer).toBeTransformation(
      Number.MIN_VALUE,
      Number.MIN_VALUE,
      Number.MIN_VALUE,
      [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
    );
  });

  test('Number.MAX_SAFE_INTEGER', () => {
    expect(transformer).toBeTransformation(
      Number.MAX_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER,
      [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f, 0x43],
    );
  });

  test('Number.MAX_VALUE', () => {
    expect(transformer).toBeTransformation(
      Number.MAX_VALUE,
      Number.MAX_VALUE,
      Number.MAX_VALUE,
      [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xef, 0x7f],
    );
  });

  test('Infinity', () => {
    expect(transformer).toBeTransformation(
      Infinity,
      'Infinity',
      'Infinity',
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x7f],
    );
  });
});
