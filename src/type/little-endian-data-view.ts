/**
 * @see {@linkcode ReadonlyDataView}
 * @see {@linkcode WriteonlyDataView}
 * @see {@linkcode DataView}
 */
export interface LittleEndianDataView {
  /**
   * @see {@linkcode ReadonlyDataView#buffer}
   * @see {@linkcode WriteonlyDataView#buffer}
   * @see {@linkcode DataView#buffer}
   */
  readonly buffer: ArrayBuffer;

  /**
   * @see {@linkcode ReadonlyDataView#byteLength}
   * @see {@linkcode WriteonlyDataView#byteLength}
   * @see {@linkcode DataView#byteLength}
   */
  readonly byteLength: number;

  /**
   * @see {@linkcode ReadonlyDataView#byteOffset}
   * @see {@linkcode WriteonlyDataView#byteOffset}
   * @see {@linkcode DataView#byteOffset}
   */
  readonly byteOffset: number;

  /**
   * @see {@linkcode ReadonlyDataView#getFloat32}
   * @see {@linkcode WriteonlyDataView#getFloat32}
   * @see {@linkcode DataView#getFloat32}
   */
  getFloat32(byteOffset: number, littleEndian: true): number;

  /**
   * @see {@linkcode ReadonlyDataView#getFloat64}
   * @see {@linkcode WriteonlyDataView#getFloat64}
   * @see {@linkcode DataView#getFloat64}
   */
  getFloat64(byteOffset: number, littleEndian: true): number;

  /**
   * @see {@linkcode ReadonlyDataView#getInt8}
   * @see {@linkcode WriteonlyDataView#getInt8}
   * @see {@linkcode DataView#getInt8}
   */
  getInt8(byteOffset: number): number;

  /**
   * @see {@linkcode ReadonlyDataView#getInt16}
   * @see {@linkcode WriteonlyDataView#getInt16}
   * @see {@linkcode DataView#getInt16}
   */
  getInt16(byteOffset: number, littleEndian: true): number;

  /**
   * @see {@linkcode ReadonlyDataView#getInt32}
   * @see {@linkcode WriteonlyDataView#getInt32}
   * @see {@linkcode DataView#getInt32}
   */
  getInt32(byteOffset: number, littleEndian: true): number;

  /**
   * @see {@linkcode ReadonlyDataView#getUint8}
   * @see {@linkcode WriteonlyDataView#getUint8}
   * @see {@linkcode DataView#getUint8}
   */
  getUint8(byteOffset: number): number;

  /**
   * @see {@linkcode ReadonlyDataView#getUint16}
   * @see {@linkcode WriteonlyDataView#getUint16}
   * @see {@linkcode DataView#getUint16}
   */
  getUint16(byteOffset: number, littleEndian: true): number;

  /**
   * @see {@linkcode ReadonlyDataView#getUint32}
   * @see {@linkcode WriteonlyDataView#getUint32}
   * @see {@linkcode DataView#getUint32}
   */
  getUint32(byteOffset: number, littleEndian: true): number;

  /**
   * @see {@linkcode WriteonlyDataView#setFloat32}
   * @see {@linkcode DataView#setFloat32}
   */
  setFloat32(byteOffset: number, value: number, littleEndian: true): void;

  /**
   * @see {@linkcode WriteonlyDataView#setFloat64}
   * @see {@linkcode DataView#setFloat64}
   */
  setFloat64(byteOffset: number, value: number, littleEndian: true): void;

  /**
   * @see {@linkcode WriteonlyDataView#setInt8}
   * @see {@linkcode DataView#setInt8}
   */
  setInt8(byteOffset: number, value: number): void;

  /**
   * @see {@linkcode WriteonlyDataView#setInt16}
   * @see {@linkcode DataView#setInt16}
   */
  setInt16(byteOffset: number, value: number, littleEndian: true): void;

  /**
   * @see {@linkcode WriteonlyDataView#setInt32}
   * @see {@linkcode DataView#setInt32}
   */
  setInt32(byteOffset: number, value: number, littleEndian: true): void;

  /**
   * @see {@linkcode WriteonlyDataView#setUint8}
   * @see {@linkcode DataView#setUint8}
   */
  setUint8(byteOffset: number, value: number): void;

  /**
   * @see {@linkcode WriteonlyDataView#setUint16}
   * @see {@linkcode DataView#setUint16}
   */
  setUint16(byteOffset: number, value: number, littleEndian: true): void;

  /**
   * @see {@linkcode WriteonlyDataView#setUint32}
   * @see {@linkcode DataView#setUint32}
   */
  setUint32(byteOffset: number, value: number, littleEndian: true): void;

  /**
   * @see {@linkcode ReadonlyDataView#getBigInt64}
   * @see {@linkcode WriteonlyDataView#getBigInt64}
   * @see {@linkcode DataView#getBigInt64}
   */
  getBigInt64(byteOffset: number, littleEndian: true): bigint;

  /**
   * @see {@linkcode ReadonlyDataView#getBigUint64}
   * @see {@linkcode WriteonlyDataView#getBigUint64}
   * @see {@linkcode DataView#getBigUint64}
   */
  getBigUint64(byteOffset: number, littleEndian: true): bigint;

  /**
   * @see {@linkcode WriteonlyDataView#setBigInt64}
   * @see {@linkcode DataView#setBigInt64}
   */
  setBigInt64(byteOffset: number, value: bigint, littleEndian: true): void;

  /**
   * @see {@linkcode WriteonlyDataView#setBigUint64}
   * @see {@linkcode DataView#setBigUint64}
   */
  setBigUint64(byteOffset: number, value: bigint, littleEndian: true): void;
}
