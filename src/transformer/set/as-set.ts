import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import {normalizeValueTransformer} from '../value/normalize-value-transformer.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';
import type {ValueTransformerLike} from '../value/value-transformer-like.js';

import {SetTransformer} from './set-transformer.js';

export function asSet<I, O extends I>(
  transformer: ValueTransformerLike<I, O>,
): ValueTransformerDecorator<ReadonlySet<I>, Set<O>> {
  return createValueTransformerDecorator<ReadonlySet<I>, Set<O>>(
    new SetTransformer<I, O>(normalizeValueTransformer(transformer)),
  );
}
