import {BusyBufferDeserializerError} from '../error/busy-buffer-deserializer-error.js';
import type {Decoding} from '../type/decoding.js';
import {isYield} from '../util/guard/is-yield.js';

import {BufferReaderController} from './buffer-reader-controller.js';
import type {BufferReaderGenerator} from './buffer-reader-generator.js';
import type {BufferSourceReaderFlush} from './buffer-source-reader-flush.js';

export class BufferSourceStreamReader {
  public static from(
    stream: ReadableStream<BufferSource>,
  ): BufferSourceStreamReader {
    return new BufferSourceStreamReader(stream.getReader());
  }

  #busy = false;

  readonly #controller = new BufferReaderController();

  readonly #reader: ReadableStreamDefaultReader<BufferSource>;

  public constructor(reader: ReadableStreamDefaultReader<BufferSource>) {
    this.#reader = reader;
  }

  async #handle<T>(generator: BufferReaderGenerator<T>): Promise<T> {
    if (this.#busy) {
      throw new BusyBufferDeserializerError();
    }

    this.#busy = true;

    let result: IteratorResult<null, T> = generator.next();

    while (isYield(result)) {
      result = generator.next(await this.#reader.read());
    }

    this.#busy = false;

    return result.value;
  }

  public async final(flush?: boolean): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    await this.#handle<void>(this.#controller.final(flush));

    this.#reader.releaseLock();
  }

  public async finalRead<T>(
    decoding: Decoding<T>,
    flush: BufferSourceReaderFlush<T> = () => false,
  ): Promise<T> {
    const result: T = await this.read(decoding);

    await this.final(flush(result));

    return result;
  }

  public read<T>(decoding: Decoding<T>): Promise<T> {
    return this.#handle<T>(this.#controller.read(decoding));
  }
}
