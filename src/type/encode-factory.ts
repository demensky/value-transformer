import type {IterableEncoding} from './iterable-encoding.js';

export type EncodeFactory<T> = (data: T) => IterableEncoding;
