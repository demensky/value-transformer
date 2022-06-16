import {BusyBufferDeserializerError} from '../error/busy-buffer-deserializer-error.js';
import type {DecoderGenerator} from '../type/decoder-generator.js';

import {BufferReaderController} from './buffer-reader-controller.js';
import type {BufferReaderGenerator} from './buffer-reader-generator.js';

export class BufferSourceStreamReader {
  public static from(
    stream: ReadableStream<BufferSource>,
  ): BufferSourceStreamReader {
    return new BufferSourceStreamReader(stream.getReader());
  }

  private _busy = false;

  private readonly _controller = new BufferReaderController();

  public constructor(
    private readonly _reader: ReadableStreamDefaultReader<BufferSource>,
  ) {}

  private async _handle<T>(generator: BufferReaderGenerator<T>): Promise<T> {
    if (this._busy) {
      throw new BusyBufferDeserializerError();
    }

    this._busy = true;

    let result: IteratorResult<null, T> = generator.next();

    while (result.done !== true) {
      result = generator.next(await this._reader.read());
    }

    this._busy = false;

    return result.value;
  }

  public async final(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    await this._handle<void>(this._controller.final());

    this._reader.releaseLock();
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
