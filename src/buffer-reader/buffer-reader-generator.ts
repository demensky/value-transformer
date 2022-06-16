import type {BufferReaderChunk} from './buffer-reader-chunk.js';

export type BufferReaderGenerator<T> = Generator<null, T, BufferReaderChunk>;
