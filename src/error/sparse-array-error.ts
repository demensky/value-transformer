export class SparseArrayError extends Error {
  public override readonly name = 'SparseArrayError';

  public constructor(public readonly index: number, message?: string) {
    super(message);
  }
}
