import {DeserializationNeverError} from '../../error/deserialization-never-error';
import {SerializationNeverError} from '../../error/serialization-never-error';

import {NeverTransformer} from './never-transformer';

describe('NeverTransformer', () => {
  let transformer: NeverTransformer;

  beforeAll(() => {
    transformer = NeverTransformer.SINGLE;
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
