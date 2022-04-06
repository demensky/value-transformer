import {ValueTransformer} from '../../base/value-transformer';

export class MockTransformer<T> extends ValueTransformer<T, T> {
  public override readonly compatibleWith: ValueTransformer<
    T,
    T
  >['compatibleWith'];

  public override readonly decoder: ValueTransformer<T, T>['decoder'];

  public override readonly encode: ValueTransformer<T, T>['encode'];

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
    elements: Uint8Array,
  ) {
    super();

    // It doesn't matter for the test.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.compatibleWith = jest.fn(() => compatible) as never;

    this.decoder = jest.fn<
      TransformerReturn<T, 'decoder'>,
      TransformerParameters<T, 'decoder'>
    >(function* () {
      yield elements.length;
      return data;
    });

    this.fromLiteral = jest.fn<
      TransformerReturn<T, 'fromLiteral'>,
      TransformerParameters<T, 'fromLiteral'>
    >(() => data);

    this.encode = jest.fn<
      TransformerReturn<T, 'encode'>,
      TransformerParameters<T, 'encode'>
    >(() => [elements]);

    this.toCompactLiteral = jest.fn<
      TransformerReturn<T, 'toCompactLiteral'>,
      TransformerParameters<T, 'toCompactLiteral'>
    >(() => compact);

    this.toLiteral = jest.fn<
      TransformerReturn<T, 'toLiteral'>,
      TransformerParameters<T, 'toLiteral'>
    >(() => literal);
  }
}

type TransformerReturn<T, K extends keyof ValueTransformer<T, T>> = ReturnType<
  ValueTransformer<T, T>[K]
>;

type TransformerParameters<
  T,
  K extends keyof ValueTransformer<T, T>,
> = Parameters<ValueTransformer<T, T>[K]>;
