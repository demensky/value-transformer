export function narrowToArrayBufferView(source: BufferSource): ArrayBufferView {
  if (source instanceof ArrayBuffer) {
    return new Uint8Array(source);
  }

  return source;
}
