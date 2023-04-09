import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';
import type {Unverified} from '../../type/unverified.js';
import {isArray} from '../../util/guard/is-array.js';
import {isObject} from '../../util/guard/is-object.js';
import {ValueTransformer} from '../value/value-transformer.js';

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
    this.#fieldsInfo ??= extractTransformableFields<T>(
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      this.#ctor.prototype as T,
    );

    return this.#fieldsInfo;
  }

  public compatibleWith(data: unknown): data is Readonly<T> {
    return data instanceof this.#ctor;
  }

  public *decoder(): Decoding<T> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const instance: T = Object.create(this.#ctor.prototype as T) as T;

    for (const [key, transformer] of this.#getFieldsInfo()) {
      instance[key] = yield* transformer.decoder();
    }

    return instance;
  }

  public *encoder(data: Readonly<T>): Encoding {
    console.assert(data instanceof this.#ctor);

    for (const [key, transformer] of this.#getFieldsInfo()) {
      yield* transformer.encoder(data[key]);
    }
  }

  public fromLiteral(literal: unknown): T {
    const fields = this.#getFieldsInfo();
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const instance: T = Object.create(this.#ctor.prototype as T) as T;

    if (!isObject(literal)) {
      throw new IncompatibleLiteralError();
    }

    const unverifiedLiteral: Unverified<T> = literal;

    if (isArray(unverifiedLiteral)) {
      if (unverifiedLiteral.length !== fields.length) {
        throw new IncompatibleLiteralError();
      }

      for (const [index, [key, transformer]] of fields.entries()) {
        instance[key] = transformer.fromLiteral(unverifiedLiteral[index]);
      }
    } else {
      for (const [key, transformer] of fields) {
        instance[key] = transformer.fromLiteral(unverifiedLiteral[key]);
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
