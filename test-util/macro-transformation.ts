import type {ExecutionContext} from 'ava';

import type {ValueTransformer} from '../src/index.js';

import {toBeTransformation} from './to-be-transformation.js';

export function macroTransformation<T>(
  t: ExecutionContext<ValueTransformer<T, T>>,
  data: T,
  buffer: readonly number[],
  literal?: unknown,
  compact?: unknown,
): void {
  toBeTransformation<T>(t, t.context, data, buffer, literal, compact);
}
