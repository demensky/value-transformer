import type {RestrictedDataView} from './restricted-data-view.js';

export type DecoderGenerator<T> = Generator<number, T, RestrictedDataView>;
