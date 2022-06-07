import type {ExecutionContext} from 'ava';

import type {ValueTransformer} from '../src/index.js';

export function toBeTransformation<T>(
  t: ExecutionContext,
  transformer: ValueTransformer<T, T>,
  data: T,
  literal: unknown = data,
  compact: unknown = literal,
): void {
  t.deepEqual(
    transformer.toLiteral(data),
    literal,
    'toLiteral(data) not equal literal',
  );
  t.deepEqual(
    transformer.toCompactLiteral(data),
    compact,
    'toCompactLiteral(data) not equal compact',
  );
  t.deepEqual(
    transformer.fromLiteral(literal),
    data,
    'fromLiteral(literal) not equal data',
  );
  t.deepEqual(
    transformer.fromLiteral(compact),
    data,
    'fromLiteral(compact) not equal data',
  );
}
