import type {ValueTransformer} from '../../base/value-transformer';
import {NeverTransformerError} from '../../error/never-transformer-error';

import {NeverTransformer} from './never-transformer';

describe('NeverTransformer', () => {
  let transformer: ValueTransformer<unknown, unknown>;

  beforeAll(() => {
    transformer = new NeverTransformer();
  });

  test('compatibleWith return false', () => {
    expect(transformer.compatibleWith(null)).toBe(false);
  });

  test('fromLiteral throw error', () => {
    expect(() => {
      transformer.fromLiteral(null);
    }).toThrow(NeverTransformerError);
  });

  test('toLiteral throw error', () => {
    expect(() => {
      transformer.toLiteral(null);
    }).toThrow(NeverTransformerError);
  });
});
