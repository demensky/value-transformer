import type {OffsetCounter} from '../base/offset-counter';
import {ValueTransformer} from '../base/value-transformer';
import {isValidResizableUint} from '../util/is-valid-resizable-uint';
import {resizableUintFromDataView} from '../util/resizable-uint-from-data-view';
import {resizableUintToArrayBuffer} from '../util/resizable-uint-to-array-buffer';

export class ResizableUintTransformer extends ValueTransformer<number> {
  public fromDataView(view: DataView, offset: OffsetCounter): number {
    return resizableUintFromDataView(view, offset);
  }

  public fromLiteral(literal: unknown): number {
    if (typeof literal !== 'number') {
      throw new Error('Not implemented'); // TODO
    }

    if (isValidResizableUint(literal)) {
      throw new Error('Not implemented'); // TODO
    }

    return literal;
  }

  public *toArrayBuffers(data: number): Iterable<ArrayBuffer> {
    yield resizableUintToArrayBuffer(data);
  }

  public toLiteral(data: number): unknown {
    console.assert(isValidResizableUint(data));

    return data;
  }
}
