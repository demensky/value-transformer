import '../../jest/to-be-transformation';

import {Float64Transformer} from './float64-transformer';

describe('Float64Transformer', () => {
  let transformer: Float64Transformer;

  beforeAll(() => {
    transformer = new Float64Transformer();
  });

  test('-Infinity', () => {
    expect(transformer).toBeTransformation(-Infinity, '-Infinity', '-Infinity');
  });

  test('-Number.MAX_VALUE', () => {
    expect(transformer).toBeTransformation(
      -Number.MAX_VALUE,
      -Number.MAX_VALUE,
      -Number.MAX_VALUE,
    );
  });

  test('Number.MIN_SAFE_INTEGER', () => {
    expect(transformer).toBeTransformation(
      Number.MIN_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
    );
  });

  test('-Number.MIN_VALUE', () => {
    expect(transformer).toBeTransformation(
      -Number.MIN_VALUE,
      -Number.MIN_VALUE,
      -Number.MIN_VALUE,
    );
  });

  test('-0', () => {
    expect(transformer).toBeTransformation(-0, '-0', '-0');
  });

  test('NaN', () => {
    expect(transformer).toBeTransformation(NaN, 'NaN', 'NaN');
  });

  test('0', () => {
    expect(transformer).toBeTransformation(0, 0, 0);
  });

  test('Number.MIN_VALUE', () => {
    expect(transformer).toBeTransformation(
      Number.MIN_VALUE,
      Number.MIN_VALUE,
      Number.MIN_VALUE,
    );
  });

  test('Number.MAX_SAFE_INTEGER', () => {
    expect(transformer).toBeTransformation(
      Number.MAX_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER,
    );
  });

  test('Number.MAX_VALUE', () => {
    expect(transformer).toBeTransformation(
      Number.MAX_VALUE,
      Number.MAX_VALUE,
      Number.MAX_VALUE,
    );
  });

  test('Infinity', () => {
    expect(transformer).toBeTransformation(Infinity, 'Infinity', 'Infinity');
  });
});
