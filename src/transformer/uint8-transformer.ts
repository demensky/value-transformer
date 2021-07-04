import {OffsetCounter} from '../base/offset-counter';
import {ValueTransformer} from '../base/value-transformer';

export class Uint8Transformer extends ValueTransformer<number> {
  public fromDataView(view: DataView, offset: OffsetCounter): number {
    return view.getUint8(offset.count(Uint8Array.BYTES_PER_ELEMENT));
  }

  public fromLiteral(_literal: unknown): number {
    throw new Error('Not implemented');
  }

  public *toArrayBuffers(data: number): Iterable<ArrayBuffer> {
    yield new Uint8Array([data]).buffer;
  }

  public toLiteral(data: number): unknown {
    return data & 0xff;
  }
}
