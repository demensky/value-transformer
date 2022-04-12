import {extractTransformableFields} from '../transformer/class/decorator/extract-transformable-fields';
import type {OneOfTransformableField} from '../transformer/class/decorator/one-of-transformable-field';

import {every} from './every';

export function isNotOccupiedByTransformableField<T extends object>(
  prototype: T,
  key: keyof T,
): boolean {
  return every<OneOfTransformableField<T>>(
    extractTransformableFields<T>(prototype),
    ([itemKey]) => itemKey !== key,
  );
}
