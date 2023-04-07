import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import {normalizeValueTransformer} from '../value/normalize-value-transformer.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';
import type {ValueTransformerLike} from '../value/value-transformer-like.js';

import {ArrayTransformer} from './array-transformer.js';

export function asArray<I, O extends I>(
  transformer: ValueTransformerLike<I, O>,
): ValueTransformerDecorator<readonly I[], O[]> {
  return createValueTransformerDecorator<readonly I[], O[]>(
    new ArrayTransformer<I, O>(normalizeValueTransformer(transformer)),
  );
}
