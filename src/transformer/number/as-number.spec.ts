import {asNumber} from './as-number';

describe('asNumber', () => {
  test('return same instance', () => {
    expect(asNumber()).toBe(asNumber());
  });
});
