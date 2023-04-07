import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {BooleanTransformer} from './boolean-transformer.js';

export function asBoolean(): ValueTransformerDecorator<boolean, boolean> {
  return createValueTransformerDecorator<boolean, boolean>(
    new BooleanTransformer(),
  );
}
