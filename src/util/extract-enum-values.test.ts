import test from 'ava';

import {extractEnumValues} from './extract-enum-values.js';

test('empty enum', (t) => {
  enum EmptyEnum {}

  t.deepEqual(extractEnumValues(EmptyEnum), new Set<never>());
});

test('numeric enum', (t) => {
  enum NumericEnum {
    FOO = 0,
    BAR = 1,
  }

  t.deepEqual(
    extractEnumValues(NumericEnum),
    new Set<NumericEnum>([NumericEnum.FOO, NumericEnum.BAR]),
  );
});

test('string enum', (t) => {
  enum StringEnum {
    FOO = 'foo',
    BAR = 'bar',
  }

  t.deepEqual(
    extractEnumValues(StringEnum),
    new Set<StringEnum>([StringEnum.FOO, StringEnum.BAR]),
  );
});

test('mixed enum', (t) => {
  enum MixedEnum {
    FOO = 0,
    BAR = 'bar',
  }

  t.deepEqual(
    extractEnumValues(MixedEnum),
    new Set<MixedEnum>([MixedEnum.FOO, MixedEnum.BAR]),
  );
});
