import type {Encoding} from './encoding.js';

export type Encoder<T> = (data: T) => Encoding;
