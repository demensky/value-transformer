import {asNever} from './as-never';

describe('asNever', () => {
  it('return same instance', () => {
    expect(asNever()).toBe(asNever());
  });
});
