import type {DecoderGenerator} from '../type/decoder-generator.js';

import {BufferReaderController} from './buffer-reader-controller.js';
import type {BufferReaderGenerator} from './buffer-reader-generator.js';

export class IterableBufferReader {
  public static from(
    iterable: Iterable<ArrayBufferView>,
  ): IterableBufferReader {
    return new IterableBufferReader(iterable[Symbol.iterator]());
  }

  private readonly _controller = new BufferReaderController();

  public constructor(private readonly _iterator: Iterator<ArrayBufferView>) {}

  private _handle<T>(generator: BufferReaderGenerator<T>): T {
    let result: IteratorResult<null, T> = generator.next();

    while (result.done !== true) {
      result = generator.next(this._iterator.next());
    }

    return result.value;
  }

  public final(): void {
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    this._handle<void>(this._controller.final());
  }

  public finalRead<T>(decoder: DecoderGenerator<T>): T {
    const result: T = this.read(decoder);

    this.final();

    return result;
  }

  public read<T>(decoder: DecoderGenerator<T>): T {
    return this._handle<T>(this._controller.read(decoder));
  }
}
