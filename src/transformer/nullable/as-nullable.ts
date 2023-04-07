import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import {normalizeValueTransformer} from '../value/normalize-value-transformer.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';
import type {ValueTransformerLike} from '../value/value-transformer-like.js';

import {NullableTransformer} from './nullable-transformer.js';

export function asNullable<I, O extends I>(
  transformer: ValueTransformerLike<I, O>,
): ValueTransformerDecorator<I | null, O | null> {
  return createValueTransformerDecorator<I | null, O | null>(
    new NullableTransformer<I, O>(normalizeValueTransformer(transformer)),
  );
}
