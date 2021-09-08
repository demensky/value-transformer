import {asString} from './as-string';

describe('asString', () => {
  test('return same instance', () => {
    expect(asString()).toBe(asString());
  });
});
