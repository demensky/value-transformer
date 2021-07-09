import {ValueTransformer} from '../base/value-transformer';

export class StringTransformer extends ValueTransformer<string> {
  public fromLiteral(_literal: unknown): string {
    throw new Error('Not implemented');
  }

  public toLiteral(data: string): unknown {
    return data;
  }
}
