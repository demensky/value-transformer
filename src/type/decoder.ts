import type {Decoding} from './decoding.js';

export type Decoder<T> = () => Decoding<T>;
