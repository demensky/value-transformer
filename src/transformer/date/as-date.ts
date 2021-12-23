import {DateTransformer} from './date-transformer';

export function asDate(): DateTransformer {
  return new DateTransformer();
}
