/**
 * @see {@linkcode ReadonlyDataView}
 * @see {@linkcode DataView}
 */
export interface LittleEndianDataView {
  /**
   * @see {@linkcode ReadonlyDataView#buffer}
   * @see {@linkcode DataView#buffer}
   */
  readonly buffer: ArrayBuffer;

  /**
   * @see {@linkcode ReadonlyDataView#byteLength}
   * @see {@linkcode DataView#byteLength}
   */
  readonly byteLength: number;

  /**
   * @see {@linkcode ReadonlyDataView#byteOffset}
   * @see {@linkcode DataView#byteOffset}
   */
  readonly byteOffset: number;

  /**
   * @see {@linkcode ReadonlyDataView#getFloat32}
   * @see {@linkcode DataView#getFloat32}
   */
  getFloat32(byteOffset: number, littleEndian: true): number;

  /**
   * @see {@linkcode ReadonlyDataView#getFloat64}
   * @see {@linkcode DataView#getFloat64}
   */
  getFloat64(byteOffset: number, littleEndian: true): number;

  /**
   * @see {@linkcode ReadonlyDataView#getInt8}
   * @see {@linkcode DataView#getInt8}
   */
  getInt8(byteOffset: number): number;

  /**
   * @see {@linkcode ReadonlyDataView#getInt16}
   * @see {@linkcode DataView#getInt16}
   */
  getInt16(byteOffset: number, littleEndian: true): number;

  /**
   * @see {@linkcode ReadonlyDataView#getInt32}
   * @see {@linkcode DataView#getInt32}
   */
  getInt32(byteOffset: number, littleEndian: true): number;

  /**
   * @see {@linkcode ReadonlyDataView#getUint8}
   * @see {@linkcode DataView#getUint8}
   */
  getUint8(byteOffset: number): number;

  /**
   * @see {@linkcode ReadonlyDataView#getUint16}
   * @see {@linkcode DataView#getUint16}
   */
  getUint16(byteOffset: number, littleEndian: true): number;

  /**
   * @see {@linkcode ReadonlyDataView#getUint32}
   * @see {@linkcode DataView#getUint32}
   */
  getUint32(byteOffset: number, littleEndian: true): number;

  /**
   * @see {@linkcode DataView#setFloat32}
   */
  setFloat32(byteOffset: number, value: number, littleEndian: true): void;

  /**
   * @see {@linkcode DataView#setFloat64}
   */
  setFloat64(byteOffset: number, value: number, littleEndian: true): void;

  /**
   * @see {@linkcode DataView#setInt8}
   */
  setInt8(byteOffset: number, value: number): void;

  /**
   * @see {@linkcode DataView#setInt16}
   */
  setInt16(byteOffset: number, value: number, littleEndian: true): void;

  /**
   * @see {@linkcode DataView#setInt32}
   */
  setInt32(byteOffset: number, value: number, littleEndian: true): void;

  /**
   * @see {@linkcode DataView#setUint8}
   */
  setUint8(byteOffset: number, value: number): void;

  /**
   * @see {@linkcode DataView#setUint16}
   */
  setUint16(byteOffset: number, value: number, littleEndian: true): void;

  /**
   * @see {@linkcode DataView#setUint32}
   */
  setUint32(byteOffset: number, value: number, littleEndian: true): void;
}
