import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {RegExpTransformer} from './reg-exp-transformer.js';

export function asRegExp(): ValueTransformerDecorator<RegExp, RegExp> {
  return createValueTransformerDecorator<RegExp, RegExp>(
    new RegExpTransformer(),
  );
}
