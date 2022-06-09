import {DateTransformer} from './date-transformer.js';

export function asDate(): DateTransformer {
  return new DateTransformer();
}
