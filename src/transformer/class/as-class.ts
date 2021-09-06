import {ClassTransformer} from './class-transformer';

export function asClass<T>(
  constructor: new (...args: never) => T,
): ClassTransformer<T> {
  return ClassTransformer.fromConstructor(constructor);
}
