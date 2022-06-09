import type {ExecutionContext} from 'ava';
import test from 'ava';

import type {DecoderGenerator} from '../type/decoder-generator.js';
import type {ReadonlyLittleEndianDataView} from '../type/readonly-little-endian-data-view.js';

import {SyncBufferDeserializer} from './sync-buffer-deserializer.js';

function* mockDecoder(
  counts: readonly number[],
): DecoderGenerator<readonly (readonly number[])[]> {
  const result: (readonly number[])[] = [];

  for (const count of counts) {
    const dataView: ReadonlyLittleEndianDataView = yield count;

    result.push([
      ...new Uint8Array(
        dataView.buffer,
        dataView.byteOffset,
        dataView.byteLength,
      ),
    ]);
  }

  return result;
}

function macroSyncBufferDeserializer(
  t: ExecutionContext,
  inputChunks: readonly (readonly number[])[],
  outputChunks: readonly (readonly number[])[],
): void {
  const deserializer = SyncBufferDeserializer.from(
    inputChunks.map((list) => new Uint8Array(list)),
  );

  t.deepEqual(
    deserializer.read<readonly (readonly number[])[]>(
      mockDecoder(outputChunks.map(({length}) => length)),
    ),
    outputChunks,
  );
}

test(
  'single chunk 1 1 1 1 1 1',
  macroSyncBufferDeserializer,
  [[0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]],
  [[0x0a], [0x0b], [0x0c], [0x0d], [0x0e], [0x0f]],
);

test(
  'single chunk 1 2 3',
  macroSyncBufferDeserializer,
  [[0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]],
  [[0x0a], [0x0b, 0x0c], [0x0d, 0x0e, 0x0f]],
);

test(
  'single chunk 2 2 2',
  macroSyncBufferDeserializer,
  [[0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]],
  [
    [0x0a, 0x0b],
    [0x0c, 0x0d],
    [0x0e, 0x0f],
  ],
);

test(
  'single chunk 6',
  macroSyncBufferDeserializer,
  [[0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]],
  [[0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]],
);

test(
  'two chunks 1 1 1 1 1 1',
  macroSyncBufferDeserializer,
  [
    [0x0a, 0x0b, 0x0c],
    [0x0d, 0x0e, 0x0f],
  ],
  [[0x0a], [0x0b], [0x0c], [0x0d], [0x0e], [0x0f]],
);

test(
  'two chunks 4 2',
  macroSyncBufferDeserializer,
  [
    [0x0a, 0x0b, 0x0c],
    [0x0d, 0x0e, 0x0f],
  ],
  [
    [0x0a, 0x0b, 0x0c, 0x0d],
    [0x0e, 0x0f],
  ],
);

test(
  'two chunks 2 2 2',
  macroSyncBufferDeserializer,
  [
    [0x0a, 0x0b, 0x0c],
    [0x0d, 0x0e, 0x0f],
  ],
  [
    [0x0a, 0x0b],
    [0x0c, 0x0d],
    [0x0e, 0x0f],
  ],
);

test(
  'two chunks 2 4',
  macroSyncBufferDeserializer,
  [
    [0x0a, 0x0b, 0x0c],
    [0x0d, 0x0e, 0x0f],
  ],
  [
    [0x0a, 0x0b],
    [0x0c, 0x0d, 0x0e, 0x0f],
  ],
);

test(
  'three chunks 1 4 1',
  macroSyncBufferDeserializer,
  [
    [0x0a, 0x0b],
    [0x0c, 0x0d],
    [0x0e, 0x0f],
  ],
  [[0x0a], [0x0b, 0x0c, 0x0d, 0x0e], [0x0f]],
);
