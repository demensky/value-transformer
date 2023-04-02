/* istanbul ignore file */

import {ValueTransformer} from '../src/transformer/value/value-transformer.js';
import type {Decoding} from '../src/type/decoding.js';
import type {Encoding} from '../src/type/encoding.js';

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

  public *decoder(): Decoding<T> {
    yield this.#buffer.length;

    return this.#data;
  }

  public *encode(_data: T): Encoding {
    (yield this.#buffer.byteLength).setView(() => {
      throw new Error('Not implemented'); // TODO
    });
  }

  public fromLiteral(_literal: unknown): T {
    return this.#data;
  }

  public toLiteral(_data: T, compact: boolean): unknown {
    return compact ? this.#compact : this.#literal;
  }
}
