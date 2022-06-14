export type BufferReaderGenerator<T> = Generator<
  null,
  T,
  IteratorResult<ArrayBufferView>
>;
