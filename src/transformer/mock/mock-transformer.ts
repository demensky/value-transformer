import {ValueTransformer} from '../../base/value-transformer';

export class MockTransformer<I, O extends I> extends ValueTransformer<I, O> {
  public override readonly compatibleWith: ValueTransformer<
    I,
    O
  >['compatibleWith'];

  public override readonly fromLiteral: ValueTransformer<I, O>['fromLiteral'];

  public override readonly toCompactLiteral: ValueTransformer<
    I,
    O
  >['toCompactLiteral'];

  public override readonly toLiteral: ValueTransformer<I, O>['toLiteral'];

  public constructor(
    compatibleWithResult: boolean,
    fromLiteralResult: O,
    toCompactLiteralResult: unknown,
    toLiteralResult: unknown,
  ) {
    super();
    // It doesn't matter for the test.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.compatibleWith = jest.fn(() => compatibleWithResult) as never;
    this.fromLiteral = jest.fn(() => fromLiteralResult);
    this.toCompactLiteral = jest.fn(() => toCompactLiteralResult);
    this.toLiteral = jest.fn(() => toLiteralResult);
  }
}
