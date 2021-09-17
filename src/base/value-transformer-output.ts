export interface ValueTransformerOutput<W> {
  fromLiteral(literal: unknown): W;
}
