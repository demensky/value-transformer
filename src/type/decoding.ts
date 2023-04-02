import type {RestrictedDataView} from './restricted-data-view.js';

export type Decoding<T> = Generator<number, T, RestrictedDataView>;
