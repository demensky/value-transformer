import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import type {UnverifiedObject} from '../../type/unverified-object';
import {isArray} from '../../util/guard/is-array';
import {isObject} from '../../util/guard/is-object';
import {identity} from '../../util/identity';

import {extractTransformableFields} from './decorator/extract-transformable-fields';
import type {OneOfTransformableField} from './decorator/one-of-transformable-field';

export class ClassTransformer<T extends object> extends ValueTransformer<
  Readonly<T>,
  T
> {
  public static fromConstructor<T extends object>(
    constructor: new (...args: never) => T,
  ): ClassTransformer<T> {
    return new ClassTransformer<T>(constructor);
  }

  private _fieldsInfo: readonly OneOfTransformableField<T>[] | null = null;

  private constructor(
    private readonly _constructor: new (...args: never) => T,
  ) {
    super();
  }

  private _getFieldsInfo(): readonly OneOfTransformableField<T>[] {
    if (this._fieldsInfo !== null) {
      return this._fieldsInfo;
    }

    this._fieldsInfo = [
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      ...extractTransformableFields<T>(this._constructor.prototype as T),
    ];

    return this._fieldsInfo;
  }

  public compatibleWith(data: unknown): data is Readonly<T> {
    return data instanceof this._constructor;
  }

  public fromLiteral(literal: unknown): T {
    const fields = this._getFieldsInfo();
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const instance: T = Object.create(this._constructor.prototype as T) as T;

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

  public override toCompactLiteral(data: Readonly<T>): unknown {
    console.assert(data instanceof this._constructor);

    return this._getFieldsInfo().map<unknown>(([key, transformer]) =>
      transformer.toCompactLiteral(data[key]),
    );
  }

  public toLiteral(data: Readonly<T>): unknown {
    console.assert(data instanceof this._constructor);

    const fields = this._getFieldsInfo();
    const literal: Partial<Record<keyof T, unknown>> = {};

    for (const [key, transformer] of fields) {
      literal[key] = transformer.toLiteral(data[key]);
    }

    return literal;
  }
}
