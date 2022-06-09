import {NeverTransformer} from './never-transformer.js';

export function asNever(): NeverTransformer {
  return new NeverTransformer();
}
