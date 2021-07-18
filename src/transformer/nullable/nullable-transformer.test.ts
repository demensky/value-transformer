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
      expect(mockTransformer.compatibleWithCalls).toHaveLength(0);
    });

    test('fromLiteral', () => {
      expect(transformer.fromLiteral(null)).toBe(null);
      expect(mockTransformer.fromLiteralCalls).toHaveLength(0);
    });

    test('toCompactLiteral', () => {
      expect(transformer.toCompactLiteral(null)).toBe(null);
      expect(mockTransformer.toCompactLiteralCalls).toHaveLength(0);
    });

    test('toLiteral', () => {
      expect(transformer.toCompactLiteral(null)).toBe(null);
      expect(mockTransformer.toCompactLiteralCalls).toHaveLength(0);
    });
  });

  describe('not null value', () => {
    test('compatibleWith', () => {
      expect(transformer.compatibleWith('param')).toBe(true);
      expect(mockTransformer.compatibleWithCalls).toHaveLength(1);
      expect(mockTransformer.compatibleWithCalls[0]).toEqual(['param']);
    });

    test('fromLiteral', () => {
      expect(transformer.fromLiteral('param')).toBe('data');
      expect(mockTransformer.fromLiteralCalls).toHaveLength(1);
      expect(mockTransformer.fromLiteralCalls[0]).toEqual(['param']);
    });

    test('toCompactLiteral', () => {
      expect(transformer.toCompactLiteral('data')).toBe('compactLiteral');
      expect(mockTransformer.toCompactLiteralCalls).toHaveLength(1);
      expect(mockTransformer.toCompactLiteralCalls[0]).toEqual(['data']);
    });

    test('toLiteral', () => {
      expect(transformer.toLiteral('data')).toBe('literal');
      expect(mockTransformer.toLiteralCalls).toHaveLength(1);
      expect(mockTransformer.toLiteralCalls[0]).toEqual(['data']);
    });
  });
});
