import {uintDecoder} from '../../coder/uint/uint-decoder.js';
import {uintEncode} from '../../coder/uint/uint-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {TransformerNotFoundError} from '../../error/transformer-not-found-error.js';
import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';
import type {Unverified} from '../../type/unverified.js';
import type {ValueTransformersTuple} from '../../type/value-transformers-tuple.js';
import {isArray} from '../../util/guard/is-array.js';
import {isEntry} from '../../util/guard/is-entry.js';
import {isNumber} from '../../util/guard/is-number.js';
import {isObject} from '../../util/guard/is-object.js';
import {isSafeUint} from '../../util/guard/is-safe-uint.js';
import {ValueTransformer} from '../value/value-transformer.js';
import type {ValueTransformerInput} from '../value/value-transformer-input.js';
import type {ValueTransformerOutput} from '../value/value-transformer-output.js';

type UnionLiteral =
  | readonly [is: number, value: unknown]
  | {readonly is: number; readonly value: unknown};

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
  readonly #transformers: ValueTransformersTuple<I, O>;

  public constructor(transformers: ValueTransformersTuple<I, O>) {
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

  public *decoder(): Decoding<O[number]> {
    return yield* this.#findOutputByIs(yield* uintDecoder()).decoder();
  }

  public *encode(data: I[number]): Encoding {
    const [is, transformer]: InputEntry<I[number]> = this.#findInputEntry(data);

    yield* uintEncode(is);
    yield* transformer.encode(data);
  }

  public fromLiteral(literal: unknown): O[number] {
    if (!isObject(literal)) {
      throw new IncompatibleLiteralError();
    }

    const unverifiedLiteral: Unverified<UnionLiteral> = literal;

    let is: unknown;
    let value: unknown;

    if (isArray(unverifiedLiteral)) {
      if (!isEntry(unverifiedLiteral)) {
        throw new IncompatibleLiteralError();
      }

      [is, value] = unverifiedLiteral;
    } else {
      ({is, value} = unverifiedLiteral);
    }

    if (!isNumber(is) || !isSafeUint(is)) {
      throw new IncompatibleLiteralError();
    }

    return this.#findOutputByIs(is).fromLiteral(value);
  }

  public toLiteral(data: I[number], compact: boolean): unknown {
    const [is, transformer]: InputEntry<I[number]> = this.#findInputEntry(data);
    const value: unknown = transformer.toLiteral(data, compact);

    return (compact ? [is, value] : {is, value}) satisfies UnionLiteral;
  }
}
