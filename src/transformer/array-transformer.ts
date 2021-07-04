import type {OffsetCounter} from '../base/offset-counter';
import {ValueTransformer} from '../base/value-transformer';
import {resizableUintFromDataView} from '../util/resizable-uint-from-data-view';
import {resizableUintToArrayBuffer} from '../util/resizable-uint-to-array-buffer';

export class ArrayTransformer<T> extends ValueTransformer<readonly T[]> {
  public constructor(private readonly _transformer: ValueTransformer<T>) {
    super();
  }

  public fromDataView(view: DataView, offset: OffsetCounter): readonly T[] {
    const length: number = resizableUintFromDataView(view, offset);
    const data: T[] = [];

    for (let index = 0; index < length; index++) {
      data.push(this._transformer.fromDataView(view, offset));
    }

    return data;
  }

  public fromLiteral(_literal: unknown): T[] {
    throw new Error('Not implemented');
  }

  public *toArrayBuffers(data: readonly T[]): Iterable<ArrayBuffer> {
    yield resizableUintToArrayBuffer(data.length);

    for (const item of data) {
      yield* this._transformer.toArrayBuffers(item);
    }
  }

  public toLiteral(_data: readonly T[]): unknown {
    throw new Error('Not implemented');
  }
}
