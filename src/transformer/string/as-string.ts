import {StringTransformer} from './string-transformer.js';

export function asString(): StringTransformer {
  return new StringTransformer();
}
