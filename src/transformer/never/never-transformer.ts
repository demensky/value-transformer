import {ValueTransformer} from '../../base/value-transformer';
import {DeserializationNeverError} from '../../error/deserialization-never-error';
import {SerializationNeverError} from '../../error/serialization-never-error';

/**
 * Handles no value (any attempt to serialize or deserialize will throw an
 * exception).
 * @see {@link asNever} alias
 */
export class NeverTransformer extends ValueTransformer<never, never> {
  public constructor() {
    super();
  }

  public compatibleWith(_data: unknown): _data is never {
    return false;
  }

  public fromLiteral(_literal: unknown): never {
    throw new DeserializationNeverError();
  }

  public toLiteral(_data: never): unknown {
    throw new SerializationNeverError();
  }
}
