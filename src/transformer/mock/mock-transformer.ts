import {ValueTransformer} from '../../base/value-transformer';

export class MockTransformer<T> extends ValueTransformer<T, T> {
  public override readonly compatibleWith: ValueTransformer<
    T,
    T
  >['compatibleWith'];

  public override readonly fromLiteral: ValueTransformer<T, T>['fromLiteral'];

  public override readonly toCompactLiteral: ValueTransformer<
    T,
    T
  >['toCompactLiteral'];

  public override readonly toLiteral: ValueTransformer<T, T>['toLiteral'];

  public constructor(
    compatible: boolean,
    data: T,
    compact: unknown,
    literal: unknown,
  ) {
    super();
    // It doesn't matter for the test.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.compatibleWith = jest.fn(() => compatible) as never;
    this.fromLiteral = jest.fn(() => data);
    this.toCompactLiteral = jest.fn(() => compact);
    this.toLiteral = jest.fn(() => literal);
  }
}
