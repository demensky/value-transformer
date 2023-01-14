import {uuidStringDecoder} from '../../coder/uuid-string/uuid-string-decoder.js';
import {uuidStringEncode} from '../../coder/uuid-string/uuid-string-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import type {UuidString} from '../../type/uuid-string.js';
import {isString} from '../../util/guard/is-string.js';
import {isUuidString} from '../../util/guard/is-uuid-string.js';
import {ValueTransformer} from '../value/value-transformer.js';

export class UuidStringTransformer<
  T extends UuidString,
> extends ValueTransformer<T, T> {
  public compatibleWith(data: unknown): data is T {
    return isString(data) && isUuidString<T>(data);
  }

  public decoder(): DecoderGenerator<T> {
    return uuidStringDecoder();
  }

  public *encode(data: T): IterableEncoding {
    console.assert(isString(data));

    yield uuidStringEncode(data);
  }

  public fromLiteral(literal: unknown): T {
    if (!isString(literal)) {
      throw new IncompatibleLiteralError('only strings are supported');
    }

    if (!isUuidString<T>(literal)) {
      throw new IncompatibleLiteralError('string must be uuid in dash-case');
    }

    return literal;
  }

  public toLiteral(data: T): unknown {
    console.assert(isString(data) && isUuidString<T>(data));

    return data;
  }
}
