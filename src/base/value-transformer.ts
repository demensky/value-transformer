import type {ValueTransformerInput} from './value-transformer-input';
import type {ValueTransformerOutput} from './value-transformer-output';

export abstract class ValueTransformer<I, O extends I>
  implements ValueTransformerInput<I>, ValueTransformerOutput<O>
{
  public abstract compatibleWith(data: unknown): data is I;

  public abstract fromLiteral(literal: unknown): O;

  public abstract toLiteral(data: I): unknown;

  public toCompactLiteral(data: I): unknown {
    return this.toLiteral(data);
  }
}
