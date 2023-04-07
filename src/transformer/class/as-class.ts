import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';

import {ClassTransformer} from './class-transformer.js';

export function asClass<T extends object>(
  constructor: new (...args: never) => T,
): ValueTransformerDecorator<Readonly<T>, T> {
  return createValueTransformerDecorator<Readonly<T>, T>(
    ClassTransformer.fromConstructor(constructor),
  );
}
