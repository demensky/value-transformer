import {extractEnumMap} from './extract-enum-map';

describe('extractEnumMap', () => {
  test('empty enum return empty map', () => {
    enum EmptyEnum {}

    expect(extractEnumMap(EmptyEnum)).toStrictEqual(new Map());
  });

  test('numeric enum', () => {
    enum NumericEnum {
      FOO = 0,
      BAR = 1,
    }

    expect(extractEnumMap(NumericEnum)).toStrictEqual(
      new Map([
        ['FOO', 0],
        ['BAR', 1],
      ]),
    );
  });

  test('string enum', () => {
    enum StringEnum {
      FOO = 'foo',
      BAR = 'bar',
    }

    expect(extractEnumMap(StringEnum)).toStrictEqual(
      new Map([
        ['FOO', 'foo'],
        ['BAR', 'bar'],
      ]),
    );
  });

  test('heterogeneous enum', () => {
    enum HeterogeneousEnum {
      FOO = 0,
      BAR = 'bar',
    }

    expect(extractEnumMap(HeterogeneousEnum)).toStrictEqual(
      new Map<string, number | string>([
        ['FOO', 0],
        ['BAR', 'bar'],
      ]),
    );
  });
});
