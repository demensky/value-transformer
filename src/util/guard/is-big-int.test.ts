import {isBigInt} from './is-big-int';

describe('isBigInt', () => {
  test('boolean', () => {
    expect(isBigInt(false)).toBe(false);
    expect(isBigInt(true)).toBe(false);
  });

  test('nil', () => {
    expect(isBigInt(null)).toBe(false);
    expect(isBigInt(undefined)).toBe(false);
  });

  test('string', () => {
    expect(isBigInt('')).toBe(false);
    expect(isBigInt('0')).toBe(false);
    expect(isBigInt('-0')).toBe(false);
    expect(isBigInt('1')).toBe(false);
    expect(isBigInt('-1')).toBe(false);
    expect(isBigInt('42')).toBe(false);
  });

  test('number', () => {
    expect(isBigInt(0)).toBe(false);
    expect(isBigInt(1)).toBe(false);
    expect(isBigInt(-1)).toBe(false);
    expect(isBigInt(Infinity)).toBe(false);
    expect(isBigInt(-Infinity)).toBe(false);
    expect(isBigInt(NaN)).toBe(false);
  });

  test('object', () => {
    expect(isBigInt({})).toBe(false);
    expect(isBigInt([])).toBe(false);
  });

  test('boxed BigInt object', () => {
    expect(isBigInt(Object(0n))).toBe(false);
  });

  test('bigint', () => {
    expect(isBigInt(0n)).toBe(true);
    expect(isBigInt(1n)).toBe(true);
    expect(isBigInt(9007199254740992n)).toBe(true);
  });
});
