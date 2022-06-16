import type {BufferReaderChunkContinue} from './buffer-reader-chunk-continue.js';
import type {BufferReaderChunkDone} from './buffer-reader-chunk-done.js';

export type BufferReaderChunk =
  | BufferReaderChunkContinue
  | BufferReaderChunkDone;
