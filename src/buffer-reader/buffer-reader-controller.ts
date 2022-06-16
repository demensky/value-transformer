import {BufferDeserializerRangeError} from '../error/buffer-deserializer-range-error.js';
import {CorruptedBufferDeserializerError} from '../error/corrupted-buffer-deserializer-error.js';
import type {DecoderGenerator} from '../type/decoder-generator.js';
import type {ReadonlyLittleEndianDataView} from '../type/readonly-little-endian-data-view.js';
import {narrowToArrayBufferView} from '../util/narrow-to-array-buffer-view.js';

import type {BufferReaderChunk} from './buffer-reader-chunk.js';
import type {BufferReaderGenerator} from './buffer-reader-generator.js';

function* nextChunk(): BufferReaderGenerator<ArrayBufferView> {
  let chunk: BufferReaderChunk;

  do {
    chunk = yield null;

    if (chunk.done === true) {
      throw new BufferDeserializerRangeError();
    }
  } while (chunk.value.byteLength === 0);

  return narrowToArrayBufferView(chunk.value);
}

export class BufferReaderController {
  private _chunk: ArrayBufferView | null = null;

  private _corrupted: CorruptedBufferDeserializerError | null = null;

  private _cursor = 0;

  private _throwAsCorrupted(cause: unknown): never {
    this._corrupted = new CorruptedBufferDeserializerError(
      'due to an error, further data reading is meaningless',
      // TODO remove "as"
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      {cause} as ErrorOptions,
    );

    throw cause;
  }

  public *final(): BufferReaderGenerator<void> {
    if (this._corrupted !== null) {
      throw this._corrupted;
    }

    if (this._chunk !== null) {
      this._throwAsCorrupted(new BufferDeserializerRangeError());
    }

    while (true) {
      const chunk: BufferReaderChunk = yield null;

      if (chunk.done === true) {
        return;
      }

      if (chunk.value.byteLength > 0) {
        this._throwAsCorrupted(new BufferDeserializerRangeError());
      }
    }
  }

  public *read<T>(decoder: DecoderGenerator<T>): BufferReaderGenerator<T> {
    if (this._corrupted !== null) {
      throw this._corrupted;
    }

    try {
      let request: IteratorResult<number, T> = decoder.next();

      while (request.done !== true) {
        const byteLength: number = request.value;

        if (byteLength === 0) {
          request = decoder.next(new DataView(new Uint8Array(0).buffer));
          continue;
        }

        let response: ReadonlyLittleEndianDataView;
        let chunk: ArrayBufferView;
        let cursor: number;

        if (this._chunk === null) {
          chunk = yield* nextChunk();
          cursor = 0;
        } else {
          chunk = this._chunk;
          cursor = this._cursor;
        }

        if (byteLength <= chunk.byteLength - cursor) {
          response = new DataView(
            chunk.buffer,
            chunk.byteOffset + cursor,
            byteLength,
          );

          cursor += byteLength;
        } else {
          const responseArray = new Uint8Array(byteLength);
          let left: number = byteLength - (chunk.byteLength - cursor);

          responseArray.set(
            new Uint8Array(
              chunk.buffer,
              chunk.byteOffset + cursor,
              chunk.byteLength - cursor,
            ),
            0,
          );

          while (true) {
            chunk = yield* nextChunk();

            if (chunk.byteLength >= left) {
              break;
            }

            responseArray.set(
              new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength),
              byteLength - left,
            );

            left -= chunk.byteLength;
          }

          responseArray.set(
            new Uint8Array(chunk.buffer, chunk.byteOffset, left),
            byteLength - left,
          );

          cursor = left;
          response = new DataView(responseArray.buffer);
        }

        if (chunk.byteLength === cursor) {
          this._chunk = null;
        } else {
          this._chunk = chunk;
          this._cursor = cursor;
        }

        request = decoder.next(response);
      }

      return request.value;
    } catch (cause) {
      this._throwAsCorrupted(cause);
    }
  }
}
