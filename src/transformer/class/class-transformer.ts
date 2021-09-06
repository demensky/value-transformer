// TODO reduce eslint-disable
/* eslint-disable @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any,@typescript-eslint/consistent-type-assertions */

/// <reference types="reflect-metadata" />

import {ValueTransformer} from '../../base/value-transformer';

import {CLASS_TRANSFORMER_FIELD_TRANSFORMER} from './class-transformer-field-transformer';
import {CLASS_TRANSFORMER_KEYS} from './class-transformer-keys';

class FieldInfo<K extends string, I, O extends I> {
  public constructor(
    public readonly key: K,
    public readonly transformer: ValueTransformer<I, O>,
  ) {}
}

export class ClassTransformer<T> extends ValueTransformer<Readonly<T>, T> {
  public static fromConstructor<T>(
    constructor: new (...args: never) => T,
  ): ClassTransformer<T> {
    return new ClassTransformer<T>(constructor);
  }

  private _fieldsInfo: readonly FieldInfo<string & keyof T, any, any>[] | null =
    null;

  private constructor(
    private readonly _constructor: new (...args: never) => T,
  ) {
    super();
  }

  private _getFieldsInfo(): readonly FieldInfo<string & keyof T, any, any>[] {
    if (this._fieldsInfo !== null) {
      return this._fieldsInfo;
    }

    const {prototype} = this._constructor;

    const keys: readonly (string & keyof T)[] =
      Reflect.getOwnMetadata(CLASS_TRANSFORMER_KEYS, prototype) ?? [];

    const fieldsInfo: FieldInfo<string & keyof T, any, any>[] = keys.map<
      FieldInfo<string & keyof T, any, any>
    >(
      (key) =>
        new FieldInfo<string & keyof T, any, any>(
          key,
          Reflect.getMetadata(
            CLASS_TRANSFORMER_FIELD_TRANSFORMER,
            prototype,
            key,
          ),
        ),
    );

    this._fieldsInfo = fieldsInfo;

    return fieldsInfo;
  }

  public compatibleWith(data: unknown): data is Readonly<T> {
    return data instanceof this._constructor;
  }

  public fromLiteral(literal: unknown): T {
    const fields = this._getFieldsInfo();
    const instance: T = Object.create(this._constructor.prototype);

    if (Array.isArray(literal)) {
      if (literal.length !== fields.length) {
        throw new Error('Incorrect count of fields'); // TODO separate error
      }

      for (let i = 0; i < fields.length; i++) {
        const {key, transformer}: FieldInfo<string & keyof T, any, any> =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          fields[i]!;

        instance[key] = transformer.fromLiteral(literal[i]);
      }
    } else if (typeof literal === 'object' && literal !== null) {
      for (const {key, transformer} of fields) {
        instance[key] = transformer.fromLiteral(
          (literal as Record<string, unknown>)[key],
        );
      }
    }

    return instance;
  }

  public override toCompactLiteral(data: Readonly<T>): unknown {
    return this._getFieldsInfo().map<unknown>(({key, transformer}) =>
      transformer.toCompactLiteral(data[key]),
    );
  }

  public toLiteral(data: Readonly<T>): unknown {
    const fields = this._getFieldsInfo();
    const literal: Record<string, unknown> = {};

    for (const {key, transformer} of fields) {
      literal[key] = transformer.toLiteral(data[key]);
    }

    return literal;
  }
}
