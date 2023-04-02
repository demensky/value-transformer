import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';

import type {ValueTransformerInput} from './value-transformer-input.js';
import type {ValueTransformerOutput} from './value-transformer-output.js';

export abstract class ValueTransformer<I, O extends I>
  implements ValueTransformerInput<I>, ValueTransformerOutput<O>
{
  public abstract compatibleWith(data: unknown): data is I;

  public abstract decoder(): Decoding<O>;

  public abstract encoder(data: I): Encoding;

  public abstract fromLiteral(literal: unknown): O;

  public abstract toLiteral(data: I, compact: boolean): unknown;
}
