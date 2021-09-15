import {ClassTransformer} from './class-transformer';

export function asClass<T extends object>(
  constructor: new (...args: never) => T,
): ClassTransformer<T> {
  return ClassTransformer.fromConstructor(constructor);
}
