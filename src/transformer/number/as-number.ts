import {NumberTransformer} from './number-transformer';

const single = /*#__PURE__*/ new NumberTransformer();

export function asNumber(): NumberTransformer {
  return single;
}
