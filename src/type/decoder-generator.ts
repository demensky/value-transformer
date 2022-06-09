import type {ReadonlyLittleEndianDataView} from './readonly-little-endian-data-view.js';

export type DecoderGenerator<T> = Generator<
  number,
  T,
  ReadonlyLittleEndianDataView
>;
