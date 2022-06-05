import {extractEnumValues} from './extract-enum-values.js';

describe('extractEnumValues', () => {
  test('empty enum', () => {
    enum EmptyEnum {}

    expect(extractEnumValues(EmptyEnum)).toStrictEqual(new Set<EmptyEnum>());
  });

  test('numeric enum', () => {
    enum NumericEnum {
      FOO = 0,
      BAR = 1,
    }

    expect(extractEnumValues(NumericEnum)).toStrictEqual(
      new Set<NumericEnum>([NumericEnum.FOO, NumericEnum.BAR]),
    );
  });

  test('string enum', () => {
    enum StringEnum {
      FOO = 'foo',
      BAR = 'bar',
    }

    expect(extractEnumValues(StringEnum)).toStrictEqual(
      new Set<StringEnum>([StringEnum.FOO, StringEnum.BAR]),
    );
  });

  test('mixed enum', () => {
    enum MixedEnum {
      FOO = 0,
      BAR = 'bar',
    }

    expect(extractEnumValues(MixedEnum)).toStrictEqual(
      new Set<MixedEnum>([MixedEnum.FOO, MixedEnum.BAR]),
    );
  });
});
