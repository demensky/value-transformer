import {BooleanTransformer} from './boolean-transformer';

const single = /*#__PURE__*/ new BooleanTransformer();

export function asBoolean(): BooleanTransformer {
  return single;
}
