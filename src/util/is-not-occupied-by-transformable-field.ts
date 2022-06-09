import {extractTransformableFields} from '../transformer/class/decorator/extract-transformable-fields.js';
import type {OneOfTransformableField} from '../transformer/class/decorator/one-of-transformable-field.js';

import {every} from './every.js';

export function isNotOccupiedByTransformableField<T extends object>(
  prototype: T,
  key: keyof T,
): boolean {
  return every<OneOfTransformableField<T>>(
    extractTransformableFields<T>(prototype),
    ([itemKey]) => itemKey !== key,
  );
}
