import {BooleanTransformer} from './boolean-transformer.js';

export function asBoolean(): BooleanTransformer {
  return new BooleanTransformer();
}
