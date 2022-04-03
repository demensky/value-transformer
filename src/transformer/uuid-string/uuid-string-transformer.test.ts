/* eslint-disable @typescript-eslint/consistent-type-assertions */

import '../../jest/to-be-transformation';

import type {UuidString} from '../../type/uuid-string';

import {UuidStringTransformer} from './uuid-string-transformer';

describe('UuidStringTransformer', () => {
  let transformer: UuidStringTransformer<UuidString>;

  beforeAll(() => {
    transformer = new UuidStringTransformer<UuidString>();
  });

  test('simple', () => {
    expect(transformer).toBeTransformation(
      '00112233-4455-6677-8899-aabbccddeeff' as UuidString,
      '00112233-4455-6677-8899-aabbccddeeff' as UuidString,
      '00112233-4455-6677-8899-aabbccddeeff' as UuidString,
    );
  });

  test('nil UUID', () => {
    expect(transformer).toBeTransformation(
      '00000000-0000-0000-0000-000000000000' as UuidString,
      '00000000-0000-0000-0000-000000000000' as UuidString,
      '00000000-0000-0000-0000-000000000000' as UuidString,
    );
  });

  test('max UUID', () => {
    expect(transformer).toBeTransformation(
      'ffffffff-ffff-ffff-ffff-ffffffffffff' as UuidString,
      'ffffffff-ffff-ffff-ffff-ffffffffffff' as UuidString,
      'ffffffff-ffff-ffff-ffff-ffffffffffff' as UuidString,
    );
  });
});
