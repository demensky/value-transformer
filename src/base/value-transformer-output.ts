export interface ValueTransformerOutput<O> {
  fromLiteral(literal: unknown): O;
}
