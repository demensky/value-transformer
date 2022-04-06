import type {DecoderGenerator} from './decoder-generator';

export type DecoderGeneratorFactory<T> = () => DecoderGenerator<T>;
