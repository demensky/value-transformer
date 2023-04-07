import type {ValueTransformersTuple} from '../../type/value-transformers-tuple.js';
import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {UnionTransformer} from './union-transformer.js';

export function asUnion<I extends readonly unknown[], O extends I>(
  transformers: ValueTransformersTuple<I, O>,
): ValueTransformerDecorator<I[number], O[number]> {
  return createValueTransformerDecorator<I[number], O[number]>(
    new UnionTransformer<I, O>(transformers),
  );
}
