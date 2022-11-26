import {expect, test} from 'vitest';

import {prototypeChain} from './prototype-chain.js';

test('null', () => {
  expect(prototypeChain(null)).toYieldsReturn(undefined, []);
});

test('simple class', () => {
  class Foo {}

  expect(prototypeChain(Foo.prototype)).toYieldsReturn(undefined, [
    [Foo.prototype, undefined],
  ]);
});

test('extended class', () => {
  class Foo {}

  class Bar extends Foo {}

  expect(prototypeChain(Bar.prototype)).toYieldsReturn(undefined, [
    [Foo.prototype, undefined],
    [Bar.prototype, undefined],
  ]);
});
