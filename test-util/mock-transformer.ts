import {ValueTransformer} from '../src/index.js';

export class MockTransformer<T> extends ValueTransformer<T, T> {
  public constructor(
    private readonly _compatible: boolean,
    private readonly _data: T,
    private readonly _compact: unknown,
    private readonly _literal: unknown,
  ) {
    super();
  }

  public compatibleWith(_data: unknown): _data is T {
    return this._compatible;
  }

  public fromLiteral(_literal: unknown): T {
    return this._data;
  }

  public override toCompactLiteral(_data: T): unknown {
    return this._compact;
  }

  public toLiteral(_data: T): unknown {
    return this._literal;
  }
}
