import {extractEnumMap} from './extract-enum-map';

describe('extractEnumMap', () => {
  test('empty enum return empty map', () => {
    enum EmptyEnum {}

    expect(extractEnumMap(EmptyEnum)).toEqual(new Map());
  });

  test('numeric enum', () => {
    enum NumericEnum {
      FOO = 0,
      BAR = 1,
    }

    expect(extractEnumMap(NumericEnum)).toEqual(
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

    expect(extractEnumMap(StringEnum)).toEqual(
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

    expect(extractEnumMap(HeterogeneousEnum)).toEqual(
      new Map<string, number | string>([
        ['FOO', 0],
        ['BAR', 'bar'],
      ]),
    );
  });
});
