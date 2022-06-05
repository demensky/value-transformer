import {every} from './every.js';

describe('every', () => {
  let predicate: jest.Mock<boolean, [item: string]>;

  beforeEach(() => {
    predicate = jest.fn<boolean, [item: string]>();
  });

  test('no items', () => {
    expect(every([], predicate)).toBe(true);

    expect(predicate.mock.calls).toHaveLength(0);
  });

  describe('one item', () => {
    test('non-matching', () => {
      predicate.mockReturnValue(false);

      expect(every(['foo'], predicate)).toBe(false);

      expect(predicate).toHaveBeenCalledTimes(1);
      expect(predicate).toHaveBeenCalledWith('foo');
    });

    test('matching', () => {
      predicate.mockReturnValue(true);

      expect(every(['foo'], predicate)).toBe(true);

      expect(predicate).toHaveBeenCalledTimes(1);
      expect(predicate).toHaveBeenCalledWith('foo');
    });
  });

  describe('many items', () => {
    test('non-matching', () => {
      predicate.mockReturnValue(false);

      expect(every(['foo', 'bar', 'baz'], predicate)).toBe(false);

      expect(predicate).toHaveBeenCalledTimes(1);
      expect(predicate).toHaveBeenCalledWith('foo');
    });

    test('matching only first', () => {
      predicate.mockReturnValueOnce(true).mockReturnValue(false);

      expect(every(['foo', 'bar', 'baz'], predicate)).toBe(false);

      expect(predicate).toHaveBeenCalledTimes(2);
      expect(predicate).toHaveBeenNthCalledWith(1, 'foo');
      expect(predicate).toHaveBeenNthCalledWith(2, 'bar');
    });

    test('matching first and second', () => {
      predicate
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValue(false);

      expect(every(['foo', 'bar', 'baz'], predicate)).toBe(false);

      expect(predicate).toHaveBeenCalledTimes(3);
      expect(predicate).toHaveBeenNthCalledWith(1, 'foo');
      expect(predicate).toHaveBeenNthCalledWith(2, 'bar');
      expect(predicate).toHaveBeenNthCalledWith(3, 'baz');
    });

    test('matching every', () => {
      predicate.mockReturnValue(true);

      expect(every(['foo', 'bar', 'baz'], predicate)).toBe(true);

      expect(predicate).toHaveBeenCalledTimes(3);
      expect(predicate).toHaveBeenNthCalledWith(1, 'foo');
      expect(predicate).toHaveBeenNthCalledWith(2, 'bar');
      expect(predicate).toHaveBeenNthCalledWith(3, 'baz');
    });
  });
});
