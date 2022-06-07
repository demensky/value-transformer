import {MockTransformer} from './mock-transformer.js';

export function asMock<T>(
  compatible: boolean,
  data: T,
  literal: unknown,
  compact: unknown,
): MockTransformer<T> {
  return new MockTransformer<T>(compatible, data, compact, literal);
}
