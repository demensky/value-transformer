import {DateTransformer} from './date-transformer';

const single = /*#__PURE__*/ new DateTransformer();

export function asDate(): DateTransformer {
  return single;
}
