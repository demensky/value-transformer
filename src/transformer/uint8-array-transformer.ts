import type {OffsetCounter} from '../base/offset-counter';
import {ValueTransformer} from '../base/value-transformer';

export class Uint8ArrayTransformer extends ValueTransformer<Uint8Array> {
  public fromDataView(view: DataView, offset: OffsetCounter): Uint8Array {

  }

  public fromLiteral(literal: unknown): Uint8Array {
    return undefined;
  }

  public toArrayBuffers(data: Uint8Array): Iterable<ArrayBuffer> {
    return undefined;
  }

  public toCompactLiteral(data: Uint8Array): unknown {
    return undefined;
  }

  public toLiteral(data: Uint8Array): unknown {
    return undefined;
  }
}
