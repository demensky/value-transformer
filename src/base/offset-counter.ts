const INITIAL_OFFSET = 0;

export class OffsetCounter {
  private _byteOffset: number = INITIAL_OFFSET;

  public count(bytes: number): number {
    const {_byteOffset} = this;

    this._byteOffset += bytes;

    return _byteOffset;
  }
}
