import type {Encoding} from '../type/encoding.js';
import type {LittleEndianDataView} from '../type/little-endian-data-view.js';
import type {WriteonlyDataView} from '../type/writeonly-data-view.js';
import {isReturn} from '../util/guard/is-return.js';
import {isYield} from '../util/guard/is-yield.js';

import type {DataViewChunkIntoHandler} from './data-view-chunk-into-handler.js';
import type {DataViewChunkViewHandler} from './data-view-chunk-view-handler.js';

export class DataViewChunk {
  public static *encode(
    bufferFactory: () => ArrayBuffer,
    encoding: Encoding,
  ): Iterable<Uint8Array> {
    let request: IteratorResult<number, void> = encoding.next();

    if (isReturn(request)) {
      return;
    }

    let chunk = new DataViewChunk(bufferFactory());

    do {
      if (chunk.#tryLock(request.value)) {
        request = encoding.next(chunk);
      } else {
        yield chunk.#toUint8Array();
        chunk = new DataViewChunk(bufferFactory());
      }
    } while (isYield(request));

    if (chunk.#cursor === 0) {
      return;
    }

    yield chunk.#toUint8Array();
  }

  readonly #buffer: ArrayBuffer;

  #cursor = 0;

  #nextSize = 0;

  readonly #view: LittleEndianDataView | WriteonlyDataView;

  public constructor(array: ArrayBuffer) {
    this.#buffer = array;
    this.#view = new DataView(array);
  }

  #toUint8Array(): Uint8Array {
    return new Uint8Array(this.#buffer, 0, this.#cursor);
  }

  #tryLock(size: number): boolean {
    if (this.#nextSize !== 0) {
      throw new Error('Already locked');
    }

    if (size === 0) {
      return true;
    }

    if (this.#cursor + Math.abs(size) > this.#buffer.byteLength) {
      if (this.#cursor === 0) {
        throw new Error('Data is too big');
      }

      return false;
    }

    this.#nextSize = size;

    return true;
  }

  public setInto(handler: DataViewChunkIntoHandler): void {
    if (this.#nextSize >= 0) {
      throw new Error('Not locked as into');
    }

    this.#cursor += handler(new Uint8Array(this.#buffer, this.#cursor));

    this.#nextSize = 0;
  }

  public setView(handler: DataViewChunkViewHandler): void {
    if (this.#nextSize <= 0) {
      throw new Error('Not locked as view');
    }

    handler(this.#view, this.#cursor);

    this.#cursor += this.#nextSize;
    this.#nextSize = 0;
  }
}
