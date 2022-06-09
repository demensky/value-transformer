import {BusyBufferDeserializerError} from '../error/busy-buffer-deserializer-error.js';
import type {DecoderGenerator} from '../type/decoder-generator.js';

import type {BufferDeserializerGenerator} from './buffer-deserializer-generator.js';
import {GenericBufferDeserializer} from './generic-buffer-deserializer.js';

export class AsyncBufferDeserializer {
  public static from(
    iterable: AsyncIterable<ArrayBufferView>,
  ): AsyncBufferDeserializer {
    return new AsyncBufferDeserializer(iterable[Symbol.asyncIterator]());
  }

  private _busy = false;

  private readonly _deserializer = new GenericBufferDeserializer();

  public constructor(
    private readonly _iterator: AsyncIterator<ArrayBufferView>,
  ) {}

  private async _handle<T>(
    generator: BufferDeserializerGenerator<T>,
  ): Promise<T> {
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
    return this._handle<void>(this._deserializer.final());
  }

  public async finalRead<T>(decoder: DecoderGenerator<T>): Promise<T> {
    const result: T = await this.read(decoder);

    await this.final();

    return result;
  }

  public read<T>(decoder: DecoderGenerator<T>): Promise<T> {
    return this._handle<T>(this._deserializer.read(decoder));
  }
}
