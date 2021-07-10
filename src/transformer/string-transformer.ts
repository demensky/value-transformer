import {ValueTransformer} from '../base/value-transformer';

export class StringTransformer extends ValueTransformer<string, string> {
  public compatibleWith(_data: unknown): _data is string {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): string {
    throw new Error('Not implemented');
  }

  public toLiteral(data: string): unknown {
    return data;
  }
}
