import {ValueTransformer} from '../../base/value-transformer';
import type {ValueTransformerInput} from '../../base/value-transformer-input';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {TransformerNotFoundError} from '../../error/transformer-not-found-error';
import type {UnverifiedObject} from '../../type/unverified-object';
import {isArray} from '../../util/guard/is-array';
import {isEntry} from '../../util/guard/is-entry';
import {isNumber} from '../../util/guard/is-number';
import {isObject} from '../../util/guard/is-object';
import {identity} from '../../util/identity';

import type {UnionTransformerTransformers} from './union-transformer-transformers';

type UnionCompactLiteral = readonly [is: number, value: unknown];

interface UnionLiteral {
  readonly is: number;

  readonly value: unknown;
}

const ENTRY_VALUE_INDEX = 1;

// TODO intersection checking
export class UnionTransformer<
  I extends readonly unknown[],
  O extends I,
> extends ValueTransformer<I[number], O[number]> {
  public constructor(
    private readonly _transformers: UnionTransformerTransformers<I, O>,
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

    throw new TransformerNotFoundError();
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
      is = identity<UnverifiedObject<UnionLiteral>>(literal).is;
      value = identity<UnverifiedObject<UnionLiteral>>(literal).value;
    }

    if (!isNumber(is) || !Number.isInteger(is)) {
      throw new IncompatibleLiteralError();
    }

    const transformer: ValueTransformer<I[number], O[number]> | undefined =
      this._transformers[is];

    if (transformer === undefined) {
      throw new TransformerNotFoundError();
    }

    return transformer.fromLiteral(value);
  }

  public override toCompactLiteral(data: I[number]): unknown {
    const [is, transformer] = this._findTransformerEntry(data);

    return identity<UnionCompactLiteral>([
      is,
      transformer.toCompactLiteral(data),
    ]);
  }

  public toLiteral(data: I[number]): unknown {
    const [is, transformer] = this._findTransformerEntry(data);

    return identity<UnionLiteral>({is, value: transformer.toLiteral(data)});
  }
}
