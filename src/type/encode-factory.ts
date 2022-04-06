import type {IterableEncoding} from './iterable-encoding';

export type EncodeFactory<T> = (data: T) => IterableEncoding;
