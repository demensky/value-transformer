import {NeverTransformer} from './never-transformer';

const single = /*#__PURE__*/ new NeverTransformer();

export function asNever(): NeverTransformer {
  return single;
}
