import {ValueTransformer} from '../../base/value-transformer.js';
import {NeverTransformerError} from '../../error/never-transformer-error.js';

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

  public decoder(): never {
    throw new NeverTransformerError();
  }

  public encode(): never {
    throw new NeverTransformerError();
  }

  public fromLiteral(): never {
    throw new NeverTransformerError();
  }

  public toLiteral(): never {
    throw new NeverTransformerError();
  }
}
