import {ValueTransformer} from '../../base/value-transformer.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import type {UnverifiedObject} from '../../type/unverified-object.js';
import {isArray} from '../../util/guard/is-array.js';
import {isObject} from '../../util/guard/is-object.js';
import {identity} from '../../util/identity.js';

import {extractTransformableFields} from './decorator/extract-transformable-fields.js';
import type {OneOfTransformableField} from './decorator/one-of-transformable-field.js';

export class ClassTransformer<T extends object> extends ValueTransformer<
  Readonly<T>,
  T
> {
  public static fromConstructor<T extends object>(
    constructor: new (...args: never) => T,
  ): ClassTransformer<T> {
    return new ClassTransformer<T>(constructor);
  }

  readonly #ctor: new (...args: never) => T;

  #fieldsInfo: readonly OneOfTransformableField<T>[] | null = null;

  private constructor(ctor: new (...args: never) => T) {
    super();

    this.#ctor = ctor;
  }

  #getFieldsInfo(): readonly OneOfTransformableField<T>[] {
    if (this.#fieldsInfo !== null) {
      return this.#fieldsInfo;
    }

    this.#fieldsInfo = [
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      ...extractTransformableFields<T>(this.#ctor.prototype as T),
    ];

    return this.#fieldsInfo;
  }

  public compatibleWith(data: unknown): data is Readonly<T> {
    return data instanceof this.#ctor;
  }

  public *decoder(): DecoderGenerator<T> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const instance: T = Object.create(this.#ctor.prototype as T) as T;

    for (const [key, transformer] of this.#getFieldsInfo()) {
      instance[key] = yield* transformer.decoder();
    }

    return instance;
  }

  public *encode(data: Readonly<T>): IterableEncoding {
    console.assert(data instanceof this.#ctor);

    for (const [key, transformer] of this.#getFieldsInfo()) {
      yield* transformer.encode(data[key]);
    }
  }

  public fromLiteral(literal: unknown): T {
    const fields = this.#getFieldsInfo();
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const instance: T = Object.create(this.#ctor.prototype as T) as T;

    if (!isObject(literal)) {
      throw new IncompatibleLiteralError();
    }

    if (isArray(literal)) {
      if (literal.length !== fields.length) {
        throw new IncompatibleLiteralError();
      }

      for (const [index, [key, transformer]] of fields.entries()) {
        instance[key] = transformer.fromLiteral(literal[index]);
      }
    } else {
      for (const [key, transformer] of fields) {
        instance[key] = transformer.fromLiteral(
          identity<UnverifiedObject<T>>(literal)[key],
        );
      }
    }

    return instance;
  }

  public toLiteral(data: Readonly<T>, compact: boolean): unknown {
    console.assert(data instanceof this.#ctor);

    const fields: readonly OneOfTransformableField<T>[] = this.#getFieldsInfo();

    if (compact) {
      return fields.map<unknown>(([key, transformer]) =>
        transformer.toLiteral(data[key], true),
      );
    }

    const literal: Partial<Record<keyof T, unknown>> = {};

    for (const [key, transformer] of fields) {
      literal[key] = transformer.toLiteral(data[key], false);
    }

    return literal;
  }
}
