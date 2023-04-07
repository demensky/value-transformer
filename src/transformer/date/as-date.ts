import type {ReadonlyDate} from '../../type/readonly-date.js';
import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {DateTransformer} from './date-transformer.js';

export function asDate(): ValueTransformerDecorator<ReadonlyDate, Date> {
  return createValueTransformerDecorator<ReadonlyDate, Date>(
    new DateTransformer(),
  );
}
