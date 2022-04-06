export type BufferDeserializerGenerator<T> = Generator<
  null,
  T,
  IteratorResult<ArrayBufferView>
>;
