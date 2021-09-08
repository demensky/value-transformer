import {NeverTransformer} from './never-transformer';

export function asNever(): NeverTransformer {
  return NeverTransformer.SINGLE;
}
