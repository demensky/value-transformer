import type {ValueTransformer} from '../../base/value-transformer';
import {DeserializationNeverError} from '../../error/deserialization-never-error';
import {SerializationNeverError} from '../../error/serialization-never-error';

import {NeverTransformer} from './never-transformer';

describe('NeverTransformer', () => {
  let transformer: ValueTransformer<never, never>;

  beforeEach(() => {
    transformer = new NeverTransformer();
  });

  test('compatibleWith return false', () => {
    expect(transformer.compatibleWith(null)).toBe(false);
  });

  test('fromLiteral throw error', () => {
    expect(() => {
      transformer.fromLiteral(null);
    }).toThrow(DeserializationNeverError);
  });

  test('toLiteral throw error', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      transformer.toLiteral(null as never);
    }).toThrow(SerializationNeverError);
  });
});
