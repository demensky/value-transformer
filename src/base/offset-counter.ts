export class OffsetCounter {
  private _byteOffset = 0;

  public count(bytes: number): number {
    const {_byteOffset} = this;

    this._byteOffset += bytes;

    return _byteOffset;
  }
}
