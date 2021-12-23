import {NumberTransformer} from './number-transformer';

export function asNumber(): NumberTransformer {
  return new NumberTransformer();
}
