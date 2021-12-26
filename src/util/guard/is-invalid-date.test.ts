import {isInvalidDate} from './is-invalid-date';

describe('isInvalidDate', () => {
  test('valid date', () => {
    expect(isInvalidDate(new Date(0))).toBe(false);
  });

  test('invalid date', () => {
    expect(isInvalidDate(new Date(NaN))).toBe(true);
  });
});
