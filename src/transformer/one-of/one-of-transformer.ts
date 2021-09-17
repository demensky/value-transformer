import {ValueTransformer} from '../../base/value-transformer';
import type {ValueTransformerInput} from '../../base/value-transformer-input';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {NoCompatibleTransformerError} from '../../error/no-compatible-transformer-error';
import {isArray} from '../../util/guard/is-array';
import {isEntry} from '../../util/guard/is-entry';
import {isNumber} from '../../util/guard/is-number';
import {isObject} from '../../util/guard/is-object';

import type {OneOfTransformerCompactLiteral} from './one-of-transformer-compact-literal';
import type {OneOfTransformerLiteral} from './one-of-transformer-literal';
import type {OneOfTransformerTransformers} from './one-of-transformer-transformers';

const ENTRY_VALUE_INDEX = 1;

// TODO intersection checking
export class OneOfTransformer<
  I extends readonly unknown[],
  O extends I,
> extends ValueTransformer<I[number], O[number]> {
  public constructor(
    private readonly _transformers: OneOfTransformerTransformers<I, O>,
  ) {
    super();
  }

  private _findTransformerEntry(
    data: I[number],
  ): readonly [is: number, transformer: ValueTransformerInput<I[number]>] {
    for (const entry of this._transformers.entries()) {
      if (!entry[ENTRY_VALUE_INDEX].compatibleWith(data)) {
        continue;
      }

      return entry;
    }

    throw new NoCompatibleTransformerError();
  }

  public compatibleWith(data: unknown): data is I[number] {
    return this._transformers.some((transformer) =>
      transformer.compatibleWith(data),
    );
  }

  public fromLiteral(literal: unknown): O[number] {
    let is: unknown;
    let value: unknown;

    if (!isObject(literal)) {
      throw new IncompatibleLiteralError();
    }

    if (isArray(literal)) {
      if (!isEntry(literal)) {
        throw new IncompatibleLiteralError();
      }

      [is, value] = literal;
    } else {
      const objectLike: Partial<
        Record<keyof OneOfTransformerLiteral, unknown>
      > = literal;

      is = objectLike.is;
      value = objectLike.value;
    }

    if (!isNumber(is) || !Number.isInteger(is)) {
      throw new IncompatibleLiteralError();
    }

    const transformer: ValueTransformer<I[number], O[number]> | undefined =
      this._transformers[is];

    if (transformer === undefined) {
      throw new IncompatibleLiteralError();
    }

    return transformer.fromLiteral(value);
  }

  public override toCompactLiteral(
    data: I[number],
  ): OneOfTransformerCompactLiteral {
    const [is, transformer] = this._findTransformerEntry(data);

    return [is, transformer.toCompactLiteral(data)];
  }

  public toLiteral(data: I[number]): OneOfTransformerLiteral {
    const [is, transformer] = this._findTransformerEntry(data);

    return {is, value: transformer.toLiteral(data)};
  }
}
