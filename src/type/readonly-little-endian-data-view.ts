export interface ReadonlyLittleEndianDataView {
  readonly buffer: ArrayBuffer;

  readonly byteLength: number;

  readonly byteOffset: number;

  getFloat32(byteOffset: number, littleEndian: true): number;

  getFloat64(byteOffset: number, littleEndian: true): number;

  getInt8(byteOffset: number): number;

  getInt16(byteOffset: number, littleEndian: true): number;

  getInt32(byteOffset: number, littleEndian: true): number;

  getUint8(byteOffset: number): number;

  getUint16(byteOffset: number, littleEndian: true): number;

  getUint32(byteOffset: number, littleEndian: true): number;

  getBigInt64(byteOffset: number, littleEndian: true): bigint;

  getBigUint64(byteOffset: number, littleEndian: true): bigint;
}
