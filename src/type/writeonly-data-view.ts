/**
 * @see {@linkcode LittleEndianDataView}
 * @see {@linkcode ReadonlyDataView}
 * @see {@linkcode DataView}
 */
export interface WriteonlyDataView {
  /**
   * @see {@linkcode LittleEndianDataView#buffer}
   * @see {@linkcode ReadonlyDataView#buffer}
   * @see {@linkcode DataView#buffer}
   */
  readonly buffer: ArrayBuffer;

  /**
   * @see {@linkcode LittleEndianDataView#byteLength}
   * @see {@linkcode ReadonlyDataView#byteLength}
   * @see {@linkcode DataView#byteLength}
   */
  readonly byteLength: number;

  /**
   * @see {@linkcode LittleEndianDataView#byteOffset}
   * @see {@linkcode ReadonlyDataView#byteOffset}
   * @see {@linkcode DataView#byteOffset}
   */
  readonly byteOffset: number;

  /**
   * @see {@linkcode LittleEndianDataView#setFloat32}
   * @see {@linkcode DataView#setFloat32}
   */
  setFloat32(byteOffset: number, value: number, littleEndian: boolean): void;

  /**
   * @see {@linkcode LittleEndianDataView#setFloat64}
   * @see {@linkcode DataView#setFloat64}
   */
  setFloat64(byteOffset: number, value: number, littleEndian: boolean): void;

  /**
   * @see {@linkcode LittleEndianDataView#setInt8}
   * @see {@linkcode DataView#setInt8}
   */
  setInt8(byteOffset: number, value: number): void;

  /**
   * @see {@linkcode LittleEndianDataView#setInt16}
   * @see {@linkcode DataView#setInt16}
   */
  setInt16(byteOffset: number, value: number, littleEndian: boolean): void;

  /**
   * @see {@linkcode LittleEndianDataView#setInt32}
   * @see {@linkcode DataView#setInt32}
   */
  setInt32(byteOffset: number, value: number, littleEndian: boolean): void;

  /**
   * @see {@linkcode LittleEndianDataView#setUint8}
   * @see {@linkcode DataView#setUint8}
   */
  setUint8(byteOffset: number, value: number): void;

  /**
   * @see {@linkcode LittleEndianDataView#setUint16}
   * @see {@linkcode DataView#setUint16}
   */
  setUint16(byteOffset: number, value: number, littleEndian: boolean): void;

  /**
   * @see {@linkcode LittleEndianDataView#setUint32}
   * @see {@linkcode DataView#setUint32}
   */
  setUint32(byteOffset: number, value: number, littleEndian: boolean): void;

  /**
   * @see {@linkcode LittleEndianDataView#setBigInt64}
   * @see {@linkcode DataView#setBigInt64}
   */
  setBigInt64(byteOffset: number, value: bigint, littleEndian: boolean): void;

  /**
   * @see {@linkcode LittleEndianDataView#setBigUint64}
   * @see {@linkcode DataView#setBigUint64}
   */
  setBigUint64(byteOffset: number, value: bigint, littleEndian: boolean): void;
}
