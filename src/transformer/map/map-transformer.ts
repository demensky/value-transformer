import {ValueTransformer} from '../../base/value-transformer';

export class MapTransformer<
  KI,
  KO extends KI,
  VI,
  VO extends VI,
> extends ValueTransformer<ReadonlyMap<KI, VI>, Map<KO, VO>> {
  public constructor(
    private readonly _keyTransformer: ValueTransformer<KI, KO>,
    private readonly _valueTransformer: ValueTransformer<VI, VO>,
  ) {
    super();
  }

  public compatibleWith(_data: unknown): _data is ReadonlyMap<KI, VI> {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): Map<KO, VO> {
    throw new Error('Not implemented');
  }

  public override toCompactLiteral(data: ReadonlyMap<KI, VI>): unknown {
    return Array.from<readonly [KI, VI], readonly [unknown, unknown]>(
      data.entries(),
      ([key, value]) => [
        this._keyTransformer.toCompactLiteral(key),
        this._valueTransformer.toCompactLiteral(value),
      ],
    );
  }

  public toLiteral(data: ReadonlyMap<KI, VI>): unknown {
    return Array.from<readonly [KI, VI], readonly [unknown, unknown]>(
      data.entries(),
      ([key, value]) => [
        this._keyTransformer.toLiteral(key),
        this._valueTransformer.toLiteral(value),
      ],
    );
  }
}
