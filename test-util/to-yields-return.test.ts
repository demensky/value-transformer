import {describe, expect, test} from '@jest/globals';

import {toYieldsReturn} from './to-yields-return.js';

test('pass not a iterator', () => {
  expect(() => {
    toYieldsReturn(42, [], 42);
  }).toThrow(TypeError);
});

describe('pass', () => {
  test('without yields', () => {
    // eslint-disable-next-line require-yield
    function* generator(): Generator<never, number> {
      return 42;
    }

    const result = toYieldsReturn(generator(), [], 42);
    expect(result.pass).toBe(true);
  });

  test('with yields', () => {
    const responses: unknown[] = [];

    function* generator(): Generator<number, number> {
      responses.push(yield 1);
      responses.push(yield 2);
      responses.push(yield 3);

      return 42;
    }

    const result = toYieldsReturn(
      generator(),
      [
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ],
      42,
    );

    expect(result.pass).toBe(true);
    expect(responses).toStrictEqual(['a', 'b', 'c']);
  });
});

describe('not pass', () => {
  test('throw without yields', () => {
    // eslint-disable-next-line require-yield
    function* generator(): Generator<never, number> {
      throw new Error('foo');
    }

    const result = toYieldsReturn(generator(), [], 42);
    expect(result.pass).toBe(false);
    expect(result.message()).toStrictEqual(expect.stringContaining('foo'));
  });

  test('throw with yields', () => {
    const responses: unknown[] = [];

    function* generator(): Generator<number, never> {
      responses.push(yield 1);
      responses.push(yield 2);

      throw new Error('foo');
    }

    const result = toYieldsReturn(
      generator(),
      [
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ],
      42,
    );

    expect(result.pass).toBe(false);
    expect(result.message()).toStrictEqual(
      expect.stringMatching(/Throw error:.*Error: foo/s),
    );
    expect(responses).toStrictEqual(['a', 'b']);
  });

  test('not enough yields', () => {
    const responses: unknown[] = [];

    function* generator(): Generator<number, number> {
      responses.push(yield 1);
      responses.push(yield 2);

      return 42;
    }

    const result = toYieldsReturn(
      generator(),
      [
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ],
      42,
    );

    expect(result.pass).toBe(false);
    expect(result.message()).toStrictEqual(expect.stringMatching(/1.*2.*3/s));
    expect(responses).toStrictEqual(['a', 'b']);
  });

  test('too many yields', () => {
    const responses: unknown[] = [];

    function* generator(): Generator<number, number> {
      responses.push(yield 1);
      responses.push(yield 2);
      responses.push(yield 3);
      responses.push(yield 4);

      return 42;
    }

    const result = toYieldsReturn(
      generator(),
      [
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ],
      42,
    );

    expect(result.pass).toBe(false);
    expect(result.message()).toStrictEqual(
      expect.stringMatching(
        /Expected requests count:.*3.*Received requests count:.*4/s,
      ),
    );
    expect(responses).toStrictEqual(['a', 'b', 'c']);
  });

  test('wrong requests', () => {
    const responses: unknown[] = [];

    function* generator(): Generator<number, number> {
      responses.push(yield 1);
      responses.push(yield 2);
      responses.push(yield 99);

      return 42;
    }

    const result = toYieldsReturn(
      generator(),
      [
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ],
      42,
    );

    expect(result.pass).toBe(false);
    expect(result.message()).toStrictEqual(
      expect.stringMatching(/1.*2.*3.*99/s),
    );
    expect(responses).toStrictEqual(['a', 'b', 'c']);
  });

  test('wrong return', () => {
    const responses: unknown[] = [];

    function* generator(): Generator<number, number> {
      responses.push(yield 1);
      responses.push(yield 2);
      responses.push(yield 3);

      return 99;
    }

    const result = toYieldsReturn(
      generator(),
      [
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ],
      42,
    );

    expect(result.pass).toBe(false);
    expect(result.message()).toStrictEqual(
      expect.stringMatching(/Expected return:.*42.*Received return:.*99/s),
    );
    expect(responses).toStrictEqual(['a', 'b', 'c']);
  });
});
