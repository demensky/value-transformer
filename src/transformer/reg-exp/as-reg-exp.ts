import {RegExpTransformer} from './reg-exp-transformer';

export function asRegExp(): RegExpTransformer {
  return new RegExpTransformer();
}
