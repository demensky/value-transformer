import {BufferReaderRangeError} from '../error/buffer-reader-range-error.js';
import {CorruptedBufferReaderError} from '../error/corrupted-buffer-reader-error.js';
import type {Decoding} from '../type/decoding.js';
import type {RestrictedDataView} from '../type/restricted-data-view.js';
import {narrowToArrayBufferView} from '../util/narrow-to-array-buffer-view.js';

import type {BufferReaderChunk} from './buffer-reader-chunk.js';
import type {BufferReaderGenerator} from './buffer-reader-generator.js';

function* nextChunk(): BufferReaderGenerator<ArrayBufferView> {
  let chunk: BufferReaderChunk;

  do {
    chunk = yield null;

    if (chunk.done === true) {
      throw new BufferReaderRangeError();
    }
  } while (chunk.value.byteLength === 0);

  return narrowToArrayBufferView(chunk.value);
}

export class BufferReaderController {
  #chunk: ArrayBufferView | null = null;

  #corrupted: ErrorOptions | null = null;

  #cursor = 0;

  public *final(flush = false): BufferReaderGenerator<void> {
    if (this.#corrupted !== null) {
      throw new CorruptedBufferReaderError('', this.#corrupted);
    }

    if (flush) {
      while (true) {
        if ((yield null).done === true) {
          return;
        }
      }
    }

    if (this.#chunk !== null) {
      const cause = new BufferReaderRangeError();

      this.#corrupted = {cause};

      throw cause;
    }

    while (true) {
      const chunk: BufferReaderChunk = yield null;

      if (chunk.done === true) {
        return;
      }

      if (chunk.value.byteLength > 0) {
        const cause = new BufferReaderRangeError();

        this.#corrupted = {cause};

        throw cause;
      }
    }
  }

  public *read<T>(decoding: Decoding<T>): BufferReaderGenerator<T> {
    if (this.#corrupted !== null) {
      throw new CorruptedBufferReaderError('', this.#corrupted);
    }

    try {
      let request: IteratorResult<number, T> = decoding.next();

      while (request.done !== true) {
        const byteLength: number = request.value;

        if (byteLength === 0) {
          request = decoding.next(new DataView(new Uint8Array(0).buffer));
          continue;
        }

        let response: RestrictedDataView;
        let chunk: ArrayBufferView;
        let cursor: number;

        if (this.#chunk === null) {
          chunk = yield* nextChunk();
          cursor = 0;
        } else {
          chunk = this.#chunk;
          cursor = this.#cursor;
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
          this.#chunk = null;
        } else {
          this.#chunk = chunk;
          this.#cursor = cursor;
        }

        request = decoding.next(response);
      }

      return request.value;
    } catch (cause) {
      this.#corrupted = {cause};

      throw cause;
    }
  }
}
