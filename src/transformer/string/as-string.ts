import {StringTransformer} from './string-transformer';

const single = /*#__PURE__*/ new StringTransformer();

export function asString(): StringTransformer {
  return single;
}
