import {ValueTransformer} from '../../base/value-transformer.js';
import type {ValueTransformerInput} from '../../base/value-transformer-input.js';
import type {ValueTransformerOutput} from '../../base/value-transformer-output.js';
import {uintDecoder} from '../../coder/uint/uint-decoder.js';
import {uintEncode} from '../../coder/uint/uint-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {TransformerNotFoundError} from '../../error/transformer-not-found-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import type {UnverifiedObject} from '../../type/unverified-object.js';
import {isArray} from '../../util/guard/is-array.js';
import {isEntry} from '../../util/guard/is-entry.js';
import {isNumber} from '../../util/guard/is-number.js';
import {isObject} from '../../util/guard/is-object.js';
import {identity} from '../../util/identity.js';

import type {UnionTransformerTransformers} from './union-transformer-transformers.js';

type UnionCompactLiteral = readonly [is: number, value: unknown];

interface UnionLiteral {
  readonly is: number;

  readonly value: unknown;
}

const ENTRY_VALUE_INDEX = 1;

type InputEntry<I> = readonly [
  is: number,
  transformer: ValueTransformerInput<I>,
];

// TODO intersection checking
export class UnionTransformer<
  I extends readonly unknown[],
  O extends I,
> extends ValueTransformer<I[number], O[number]> {
  readonly #transformers: UnionTransformerTransformers<I, O>;

  public constructor(transformers: UnionTransformerTransformers<I, O>) {
    super();

    this.#transformers = transformers;
  }

  #findInputEntry(data: I[number]): InputEntry<I[number]> {
    for (const entry of this.#transformers.entries()) {
      if (!entry[ENTRY_VALUE_INDEX].compatibleWith(data)) {
        continue;
      }

      return entry;
    }

    throw new TransformerNotFoundError();
  }

  #findOutputByIs(is: number): ValueTransformerOutput<O[number]> {
    if (is >= this.#transformers.length) {
      throw new TransformerNotFoundError();
    }

    const transformer: ValueTransformerOutput<O[number]> | undefined =
      this.#transformers[is];

    if (transformer === undefined) {
      throw new TransformerNotFoundError();
    }

    return transformer;
  }

  public compatibleWith(data: unknown): data is I[number] {
    return this.#transformers.some((transformer) =>
      transformer.compatibleWith(data),
    );
  }

  public *decoder(): DecoderGenerator<O[number]> {
    return yield* this.#findOutputByIs(yield* uintDecoder()).decoder();
  }

  public *encode(data: I[number]): IterableEncoding {
    const [is, transformer]: InputEntry<I[number]> = this.#findInputEntry(data);

    yield* uintEncode(is);
    yield* transformer.encode(data);
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

    if (!isNumber(is) || !Number.isSafeInteger(is)) {
      throw new IncompatibleLiteralError();
    }

    return this.#findOutputByIs(is).fromLiteral(value);
  }

  public override toCompactLiteral(data: I[number]): unknown {
    const [is, transformer]: InputEntry<I[number]> = this.#findInputEntry(data);

    return identity<UnionCompactLiteral>([
      is,
      transformer.toCompactLiteral(data),
    ]);
  }

  public toLiteral(data: I[number]): unknown {
    const [is, transformer]: InputEntry<I[number]> = this.#findInputEntry(data);

    return identity<UnionLiteral>({is, value: transformer.toLiteral(data)});
  }
}
