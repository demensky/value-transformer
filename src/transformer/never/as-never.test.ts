import {asNever} from './as-never';

describe('asNever', () => {
  test('return same instance', () => {
    expect(asNever()).toBe(asNever());
  });
});
