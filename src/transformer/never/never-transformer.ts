import {ValueTransformer} from '../../base/value-transformer';
import {DeserializationNeverError} from '../../error/deserialization-never-error';
import {SerializationNeverError} from '../../error/serialization-never-error';

export class NeverTransformer extends ValueTransformer<never, never> {
  public static readonly SINGLE = new NeverTransformer();

  private constructor() {
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
