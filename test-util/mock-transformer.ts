import type {DecoderGenerator, IterableEncoding} from '../src/index.js';
import {ValueTransformer} from '../src/index.js';

export class MockTransformer<T> extends ValueTransformer<T, T> {
  readonly #buffer: Uint8Array;

  readonly #compact: unknown;

  readonly #compatible: boolean;

  readonly #data: T;

  readonly #literal: unknown;

  public constructor(
    compatible: boolean,
    data: T,
    buffer: Uint8Array,
    compact: unknown,
    literal: unknown,
  ) {
    super();
    this.#literal = literal;
    this.#compact = compact;
    this.#buffer = buffer;
    this.#data = data;
    this.#compatible = compatible;
  }

  public compatibleWith(_data: unknown): _data is T {
    return this.#compatible;
  }

  public *decoder(): DecoderGenerator<T> {
    yield this.#buffer.length;

    return this.#data;
  }

  public *encode(_data: T): IterableEncoding {
    yield this.#buffer;
  }

  public fromLiteral(_literal: unknown): T {
    return this.#data;
  }

  public override toCompactLiteral(_data: T): unknown {
    return this.#compact;
  }

  public toLiteral(_data: T): unknown {
    return this.#literal;
  }
}
