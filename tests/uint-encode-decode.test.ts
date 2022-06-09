import type {ExecutionContext} from 'ava';
import test from 'ava';

import {SyncBufferDeserializer} from '../src/index.js';
import {uintDecoder} from '../src/representation/uint/uint-decoder.js';
import {uintEncode} from '../src/representation/uint/uint-encode.js';

function macroEncodeDecodeUint(t: ExecutionContext, value: number): void {
  t.is(
    SyncBufferDeserializer.from(uintEncode(value)).finalRead(uintDecoder()),
    value,
  );
}

test('smallest in one byte', macroEncodeDecodeUint, 0b0000000);

test('biggest in one byte', macroEncodeDecodeUint, 0b1111111);

test('smallest in two byte', macroEncodeDecodeUint, 0b1_0000000);

test('biggest in two byte', macroEncodeDecodeUint, 0b1111111_1111111);

test('smallest in three byte', macroEncodeDecodeUint, 0b1_0000000_0000000);

test('biggest in three byte', macroEncodeDecodeUint, 0b1111111_1111111_1111111);

test('max safe integer', macroEncodeDecodeUint, Number.MAX_SAFE_INTEGER);
