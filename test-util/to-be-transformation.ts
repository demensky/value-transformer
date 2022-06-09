import type {ExecutionContext} from 'ava';

import type {ValueTransformer} from '../src/index.js';
import {SyncBufferDeserializer} from '../src/index.js';

function concatToUint8(views: ArrayBufferView[]): Uint8Array {
  const result = new Uint8Array(
    views.reduce<number>((previous, {byteLength}) => previous + byteLength, 0),
  );

  let offset = 0;

  for (const {buffer, byteLength, byteOffset} of views) {
    result.set(new Uint8Array(buffer, byteOffset, byteLength), offset);
    offset += byteLength;
  }

  return result;
}

export function toBeTransformation<T>(
  t: ExecutionContext,
  transformer: ValueTransformer<T, T>,
  data: T,
  buffer: readonly number[],
  literal: unknown = data,
  compact: unknown = literal,
): void {
  const view = new Uint8Array(buffer);

  t.deepEqual(
    transformer.toLiteral(data),
    literal,
    'toLiteral(data) not equal literal',
  );
  t.deepEqual(
    transformer.toCompactLiteral(data),
    compact,
    'toCompactLiteral(data) not equal compact',
  );
  t.deepEqual(
    transformer.fromLiteral(literal),
    data,
    'fromLiteral(literal) not equal data',
  );
  t.deepEqual(
    transformer.fromLiteral(compact),
    data,
    'fromLiteral(compact) not equal data',
  );

  t.deepEqual(
    concatToUint8([...transformer.encode(data)]).buffer,
    view.buffer,
    'encode(data) not equal buffer',
  );

  t.deepEqual(
    SyncBufferDeserializer.from([view]).finalRead(transformer.decoder()),
    data,
    'decoder() not equal data',
  );
}
