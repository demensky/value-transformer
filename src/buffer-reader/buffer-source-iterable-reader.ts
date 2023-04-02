import type {DecoderGenerator} from '../type/decoder-generator.js';

import {BufferReaderController} from './buffer-reader-controller.js';
import type {BufferReaderGenerator} from './buffer-reader-generator.js';
import type {BufferSourceReaderFlush} from './buffer-source-reader-flush.js';

export class BufferSourceIterableReader {
  public static from(
    iterable: Iterable<BufferSource>,
  ): BufferSourceIterableReader {
    return new BufferSourceIterableReader(iterable[Symbol.iterator]());
  }

  readonly #controller = new BufferReaderController();

  readonly #iterator: Iterator<BufferSource>;

  public constructor(iterator: Iterator<BufferSource>) {
    this.#iterator = iterator;
  }

  #handle<T>(generator: BufferReaderGenerator<T>): T {
    let result: IteratorResult<null, T> = generator.next();

    while (result.done !== true) {
      result = generator.next(this.#iterator.next());
    }

    return result.value;
  }

  public final(flush?: boolean): void {
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    this.#handle<void>(this.#controller.final(flush));
  }

  public finalRead<T>(
    decoder: DecoderGenerator<T>,
    flush: BufferSourceReaderFlush<T> = () => false,
  ): T {
    const result: T = this.read(decoder);

    this.final(flush(result));

    return result;
  }

  public read<T>(decoder: DecoderGenerator<T>): T {
    return this.#handle<T>(this.#controller.read(decoder));
  }
}
