import {describe, expect, test} from '@jest/globals';

import {narrowToArrayBufferView} from './narrow-to-array-buffer-view.js';

describe('narrow', () => {
  test('arrayBuffer', () => {
    const buffer = new ArrayBuffer(0);

    expect(narrowToArrayBufferView(buffer)).toStrictEqual(new Uint8Array(0));
  });
});

describe('return unchanged', () => {
  test.each([
    ['Uint8Array', Uint8Array],
    ['Uint16Array', Uint16Array],
    ['Uint32Array', Uint32Array],
    ['Int8Array', Int8Array],
    ['Int16Array', Int16Array],
    ['Int32Array', Int32Array],
    ['Float32Array', Float32Array],
    ['Float64Array', Float64Array],
    ['BigInt64Array', BigInt64Array],
    ['BigUint64Array', BigUint64Array],
  ])('%s', (_name, TypedArray) => {
    const view = new TypedArray(0);

    expect(narrowToArrayBufferView(view)).toBe(view);
  });

  test('dataView', () => {
    const view = new DataView(new ArrayBuffer(0));

    expect(narrowToArrayBufferView(view)).toBe(view);
  });
});
