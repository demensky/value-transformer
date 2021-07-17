import {ValueTransformer} from '../../base/value-transformer';

// 00112233-4455-6677-8899-aabbccddeeff
// [00 11 22 33] [44 55] [66 77] [88 99] [aa bb cc dd ee ff]
export class UuidStringTransformer extends ValueTransformer<string, string> {
  public compatibleWith(_data: unknown): _data is string {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): string {
    throw new Error('Not implemented');
  }

  public toLiteral(_data: string): unknown {
    throw new Error('Not implemented');
  }
}
