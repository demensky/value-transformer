import {BusyBufferDeserializerError} from '../error/busy-buffer-deserializer-error.js';
import type {DecoderGenerator} from '../type/decoder-generator.js';

import {BufferReaderController} from './buffer-reader-controller.js';
import type {BufferReaderGenerator} from './buffer-reader-generator.js';

export class AsyncIterableBufferReader {
  public static from(
    iterable: AsyncIterable<ArrayBufferView>,
  ): AsyncIterableBufferReader {
    return new AsyncIterableBufferReader(iterable[Symbol.asyncIterator]());
  }

  private _busy = false;

  private readonly _controller = new BufferReaderController();

  public constructor(
    private readonly _iterator: AsyncIterator<ArrayBufferView>,
  ) {}

  private async _handle<T>(generator: BufferReaderGenerator<T>): Promise<T> {
    if (this._busy) {
      throw new BusyBufferDeserializerError();
    }

    this._busy = true;

    let result: IteratorResult<null, T> = generator.next();

    while (result.done !== true) {
      result = generator.next(await this._iterator.next());
    }

    this._busy = false;

    return result.value;
  }

  public final(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    return this._handle<void>(this._controller.final());
  }

  public async finalRead<T>(decoder: DecoderGenerator<T>): Promise<T> {
    const result: T = await this.read(decoder);

    await this.final();

    return result;
  }

  public read<T>(decoder: DecoderGenerator<T>): Promise<T> {
    return this._handle<T>(this._controller.read(decoder));
  }
}
