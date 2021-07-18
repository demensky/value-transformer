import type {ValueTransformer} from '../../base/value-transformer';
import {asMock} from '../mock/as-mock';
import type {MockTransformer} from '../mock/mock-transformer';

import {asNullable} from './as-nullable';

describe('NullableTransformer', () => {
  let mockTransformer: MockTransformer<'data', 'data'>;
  let transformer: ValueTransformer<'data' | null, 'data' | null>;

  beforeEach(() => {
    mockTransformer = asMock(true, 'data', true, 'compactLiteral', 'literal');
    transformer = asNullable(mockTransformer);
  });

  describe('null value', () => {
    test('compatibleWith', () => {
      expect(transformer.compatibleWith(null)).toBe(true);
      expect(mockTransformer.compatibleWith).toBeCalledTimes(0);
    });

    test('fromLiteral', () => {
      expect(transformer.fromLiteral(null)).toBe(null);
      expect(mockTransformer.fromLiteral).toBeCalledTimes(0);
    });

    test('toCompactLiteral', () => {
      expect(transformer.toCompactLiteral(null)).toBe(null);
      expect(mockTransformer.toCompactLiteral).toBeCalledTimes(0);
    });

    test('toLiteral', () => {
      expect(transformer.toCompactLiteral(null)).toBe(null);
      expect(mockTransformer.toCompactLiteral).toBeCalledTimes(0);
    });
  });

  describe('not null value', () => {
    test('compatibleWith', () => {
      expect(transformer.compatibleWith('param')).toBe(true);
      expect(mockTransformer.compatibleWith).toBeCalledTimes(1);
      expect(mockTransformer.compatibleWith).toBeCalledWith('param');
    });

    test('fromLiteral', () => {
      expect(transformer.fromLiteral('param')).toBe('data');
      expect(mockTransformer.fromLiteral).toBeCalledTimes(1);
      expect(mockTransformer.fromLiteral).toBeCalledWith('param');
    });

    test('toCompactLiteral', () => {
      expect(transformer.toCompactLiteral('data')).toBe('compactLiteral');
      expect(mockTransformer.toCompactLiteral).toBeCalledTimes(1);
      expect(mockTransformer.toCompactLiteral).toBeCalledWith('data');
    });

    test('toLiteral', () => {
      expect(transformer.toLiteral('data')).toBe('literal');
      expect(mockTransformer.toLiteral).toBeCalledTimes(1);
      expect(mockTransformer.toLiteral).toBeCalledWith('data');
    });
  });
});
