import {StringTransformer} from './string-transformer';

export function asString(): StringTransformer {
  return new StringTransformer();
}
