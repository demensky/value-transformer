import type {DecoderGenerator} from './decoder-generator.js';

export type DecoderGeneratorFactory<T> = () => DecoderGenerator<T>;
