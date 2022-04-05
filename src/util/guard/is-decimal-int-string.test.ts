import {isDecimalIntString} from './is-decimal-int-string';

describe('isDecimalIntString', () => {
  test('decimal digits', () => {
    expect(isDecimalIntString('0')).toBe(true);
    expect(isDecimalIntString('1')).toBe(true);
    expect(isDecimalIntString('42')).toBe(true);
    expect(isDecimalIntString('9007199254740991')).toBe(true);
    expect(isDecimalIntString('18446744073709551615')).toBe(true);
    expect(isDecimalIntString('340282366920938463463374607431768211455')).toBe(
      true,
    );
  });

  test('minus and decimal digits', () => {
    expect(isDecimalIntString('-1')).toBe(true);
    expect(isDecimalIntString('-42')).toBe(true);
    expect(isDecimalIntString('-9007199254740991')).toBe(true);
    expect(isDecimalIntString('-18446744073709551615')).toBe(true);
    expect(isDecimalIntString('-340282366920938463463374607431768211455')).toBe(
      true,
    );
  });

  test('minus zero', () => {
    expect(isDecimalIntString('-0')).toBe(false);
  });

  test('decimal digits have extra zero', () => {
    expect(isDecimalIntString('01')).toBe(false);
    expect(isDecimalIntString('000042')).toBe(false);
  });

  test('empty string', () => {
    expect(isDecimalIntString('')).toBe(false);
  });

  test('minus', () => {
    expect(isDecimalIntString('-')).toBe(false);
  });

  test('letters', () => {
    expect(isDecimalIntString('abc')).toBe(false);
  });

  test('decimal digits have spaces', () => {
    expect(isDecimalIntString('  42')).toBe(false);
    expect(isDecimalIntString('42  ')).toBe(false);
    expect(isDecimalIntString('4  2')).toBe(false);
  });

  test('decimal digits have plus', () => {
    expect(isDecimalIntString('+0')).toBe(false);
    expect(isDecimalIntString('+1')).toBe(false);
    expect(isDecimalIntString('+42')).toBe(false);
    expect(isDecimalIntString('+9007199254740991')).toBe(false);
    expect(isDecimalIntString('+18446744073709551615')).toBe(false);
  });
});
