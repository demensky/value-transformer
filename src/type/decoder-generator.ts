import type {ReadonlyLittleEndianDataView} from './readonly-little-endian-data-view';

export type DecoderGenerator<T> = Generator<
  number,
  T,
  ReadonlyLittleEndianDataView
>;
