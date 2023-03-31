/**
 * @see {@linkcode LittleEndianDataView}
 * @see {@linkcode WriteonlyDataView}
 * @see {@linkcode DataView}
 */
export interface ReadonlyDataView {
  /**
   * @see {@linkcode LittleEndianDataView#buffer}
   * @see {@linkcode WriteonlyDataView#buffer}
   * @see {@linkcode DataView#buffer}
   */
  readonly buffer: ArrayBuffer;

  /**
   * @see {@linkcode LittleEndianDataView#byteLength}
   * @see {@linkcode WriteonlyDataView#byteLength}
   * @see {@linkcode DataView#byteLength}
   */
  readonly byteLength: number;

  /**
   * @see {@linkcode LittleEndianDataView#byteOffset}
   * @see {@linkcode WriteonlyDataView#byteOffset}
   * @see {@linkcode DataView#byteOffset}
   */
  readonly byteOffset: number;

  /**
   * @see {@linkcode LittleEndianDataView#getFloat32}
   * @see {@linkcode DataView#getFloat32}
   */
  getFloat32(byteOffset: number, littleEndian: boolean): number;

  /**
   * @see {@linkcode LittleEndianDataView#getFloat64}
   * @see {@linkcode DataView#getFloat64}
   */
  getFloat64(byteOffset: number, littleEndian: boolean): number;

  /**
   * @see {@linkcode LittleEndianDataView#getInt8}
   * @see {@linkcode DataView#getInt8}
   */
  getInt8(byteOffset: number): number;

  /**
   * @see {@linkcode LittleEndianDataView#getInt16}
   * @see {@linkcode DataView#getInt16}
   */
  getInt16(byteOffset: number, littleEndian: boolean): number;

  /**
   * @see {@linkcode LittleEndianDataView#getInt32}
   * @see {@linkcode DataView#getInt32}
   */
  getInt32(byteOffset: number, littleEndian: boolean): number;

  /**
   * @see {@linkcode LittleEndianDataView#getUint8}
   * @see {@linkcode DataView#getUint8}
   */
  getUint8(byteOffset: number): number;

  /**
   * @see {@linkcode LittleEndianDataView#getUint16}
   * @see {@linkcode DataView#getUint16}
   */
  getUint16(byteOffset: number, littleEndian: boolean): number;

  /**
   * @see {@linkcode LittleEndianDataView#getUint32}
   * @see {@linkcode DataView#getUint32}
   */
  getUint32(byteOffset: number, littleEndian: boolean): number;

  /**
   * @see {@linkcode LittleEndianDataView#getBigInt64}
   * @see {@linkcode DataView#getBigInt64}
   */
  getBigInt64(byteOffset: number, littleEndian: boolean): bigint;

  /**
   * @see {@linkcode LittleEndianDataView#getBigUint64}
   * @see {@linkcode DataView#getBigUint64}
   */
  getBigUint64(byteOffset: number, littleEndian: boolean): bigint;
}
