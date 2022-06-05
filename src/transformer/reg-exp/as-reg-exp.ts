import {RegExpTransformer} from './reg-exp-transformer.js';

export function asRegExp(): RegExpTransformer {
  return new RegExpTransformer();
}
