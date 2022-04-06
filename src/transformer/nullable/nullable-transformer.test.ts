import type {ValueTransformer} from '../../base/value-transformer';
import {asMock} from '../mock/as-mock';
import type {MockTransformer} from '../mock/mock-transformer';

import {NullableTransformer} from './nullable-transformer';

describe('NullableTransformer', () => {
  let mockTransformer: MockTransformer<string>;
  let transformer: ValueTransformer<string | null, string | null>;

  beforeEach(() => {
    mockTransformer = asMock(true, 'a-d', 'a-c', 'a-l', [0x0a]);
    transformer = new NullableTransformer(mockTransformer);
  });

  describe('null value', () => {
    test('compatibleWith', () => {
      expect(transformer.compatibleWith(null)).toBe(true);
      expect(mockTransformer.compatibleWith).toHaveBeenCalledTimes(0);
    });

    test('fromLiteral', () => {
      expect(transformer.fromLiteral(null)).toBeNull();
      expect(mockTransformer.fromLiteral).toHaveBeenCalledTimes(0);
    });

    test('toCompactLiteral', () => {
      expect(transformer.toCompactLiteral(null)).toBeNull();
      expect(mockTransformer.toCompactLiteral).toHaveBeenCalledTimes(0);
    });

    test('toLiteral', () => {
      expect(transformer.toCompactLiteral(null)).toBeNull();
      expect(mockTransformer.toCompactLiteral).toHaveBeenCalledTimes(0);
    });
  });

  describe('not null value', () => {
    test('compatibleWith', () => {
      expect(transformer.compatibleWith('param')).toBe(true);
      expect(mockTransformer.compatibleWith).toHaveBeenCalledTimes(1);
      expect(mockTransformer.compatibleWith).toHaveBeenCalledWith('param');
    });

    test('fromLiteral', () => {
      expect(transformer.fromLiteral('param')).toBe('a-d');
      expect(mockTransformer.fromLiteral).toHaveBeenCalledTimes(1);
      expect(mockTransformer.fromLiteral).toHaveBeenCalledWith('param');
    });

    test('toCompactLiteral', () => {
      expect(transformer.toCompactLiteral('data')).toBe('a-c');
      expect(mockTransformer.toCompactLiteral).toHaveBeenCalledTimes(1);
      expect(mockTransformer.toCompactLiteral).toHaveBeenCalledWith('data');
    });

    test('toLiteral', () => {
      expect(transformer.toLiteral('data')).toBe('a-l');
      expect(mockTransformer.toLiteral).toHaveBeenCalledTimes(1);
      expect(mockTransformer.toLiteral).toHaveBeenCalledWith('data');
    });
  });
});
