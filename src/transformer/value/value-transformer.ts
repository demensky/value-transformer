import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {Encoding} from '../../type/encoding.js';

import type {ValueTransformerInput} from './value-transformer-input.js';
import type {ValueTransformerOutput} from './value-transformer-output.js';

export abstract class ValueTransformer<I, O extends I>
  implements ValueTransformerInput<I>, ValueTransformerOutput<O>
{
  public abstract compatibleWith(data: unknown): data is I;

  public abstract decoder(): DecoderGenerator<O>;

  public abstract encode(data: I): Encoding;

  public abstract fromLiteral(literal: unknown): O;

  public abstract toLiteral(data: I, compact: boolean): unknown;
}
