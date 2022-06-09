import type {DecoderGenerator} from '../type/decoder-generator.js';

import type {BufferDeserializerGenerator} from './buffer-deserializer-generator.js';
import {GenericBufferDeserializer} from './generic-buffer-deserializer.js';

export class SyncBufferDeserializer {
  public static from(
    iterable: Iterable<ArrayBufferView>,
  ): SyncBufferDeserializer {
    return new SyncBufferDeserializer(iterable[Symbol.iterator]());
  }

  private readonly _deserializer = new GenericBufferDeserializer();

  public constructor(private readonly _iterator: Iterator<ArrayBufferView>) {}

  private _handle<T>(generator: BufferDeserializerGenerator<T>): T {
    let result: IteratorResult<null, T> = generator.next();

    while (result.done !== true) {
      result = generator.next(this._iterator.next());
    }

    return result.value;
  }

  public final(): void {
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    this._handle<void>(this._deserializer.final());
  }

  public finalRead<T>(decoder: DecoderGenerator<T>): T {
    const result: T = this.read(decoder);

    this.final();

    return result;
  }

  public read<T>(decoder: DecoderGenerator<T>): T {
    return this._handle<T>(this._deserializer.read(decoder));
  }
}
