import {ValueTransformer} from '../../base/value-transformer';

type UnknownParams = readonly unknown[];

export class MockTransformer<I, O extends I> extends ValueTransformer<I, O> {
  public readonly compatibleWithCalls: UnknownParams[] = [];

  public readonly fromLiteralCalls: UnknownParams[] = [];

  public readonly internalDataCanBeVerifiedCalls: UnknownParams[] = [];

  public readonly toCompactLiteralCalls: UnknownParams[] = [];

  public readonly toLiteralCalls: UnknownParams[] = [];

  public constructor(
    private readonly _compatibleWithResult: boolean,
    private readonly _fromLiteralResult: O,
    private readonly _internalDataCanBeVerifiedResult: boolean,
    private readonly _toCompactLiteralResult: unknown,
    private readonly _toLiteralResult: unknown,
  ) {
    super();
  }

  public compatibleWith(data: unknown): data is I {
    this.compatibleWithCalls.push([data]);

    return this._compatibleWithResult;
  }

  public fromLiteral(literal: unknown): O {
    this.fromLiteralCalls.push([literal]);

    return this._fromLiteralResult;
  }

  public override internalDataCanBeVerified(data: I): boolean {
    this.internalDataCanBeVerifiedCalls.push([data]);

    return this._internalDataCanBeVerifiedResult;
  }

  public override toCompactLiteral(data: I): unknown {
    this.toCompactLiteralCalls.push([data]);

    return this._toCompactLiteralResult;
  }

  public toLiteral(data: I): unknown {
    this.toLiteralCalls.push([data]);

    return this._toLiteralResult;
  }
}
