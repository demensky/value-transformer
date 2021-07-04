import {ValueTransformer} from '../base/value-transformer';

export class StringTransformer extends ValueTransformer<string> {
  public toLiteral(data: string): unknown {
    return data;
  }

  public fromLiteral(_literal: unknown): string {
    throw new Error('Not implemented');
  }
}
