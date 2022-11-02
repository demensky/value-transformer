import {expect, test} from '@jest/globals';

import {prototypeChain} from './prototype-chain.js';

test('null', () => {
  expect(prototypeChain(null)).toYieldsReturn([], undefined);
});

test('simple class', () => {
  class Foo {}

  expect(prototypeChain(Foo.prototype)).toYieldsReturn(
    [[Foo.prototype, undefined]],
    undefined,
  );
});

test('extended class', () => {
  class Foo {}

  class Bar extends Foo {}

  expect(prototypeChain(Bar.prototype)).toYieldsReturn(
    [
      [Foo.prototype, undefined],
      [Bar.prototype, undefined],
    ],
    undefined,
  );
});
