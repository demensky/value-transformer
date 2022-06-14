import type {ExecutionContext} from 'ava';

import type {EncodeFactory} from '../src/index.js';

export function macroEncodeThrow<T>(
  t: ExecutionContext<EncodeFactory<T>>,
  data: T,
): void {
  t.throws(() => {
    Array.from<unknown>(t.context(data));
  });
}
