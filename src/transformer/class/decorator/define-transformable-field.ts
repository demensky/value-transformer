import type {ValueTransformer} from '../../../base/value-transformer';
import {isNotOccupiedByTransformableField} from '../../../util/is-not-occupied-by-transformable-field';

import type {OneOfTransformableField} from './one-of-transformable-field';
import {transformableFieldsMap} from './transformable-fields-map';

export function defineTransformableField<
  T extends object,
  K extends string & keyof T,
>(prototype: T, key: K, transformer: ValueTransformer<T[K], T[K]>): void {
  let transformers: OneOfTransformableField<T>[] | undefined =
    transformableFieldsMap.get<T>(prototype);

  if (transformers === undefined) {
    transformers = [];
    transformableFieldsMap.set<T>(prototype, transformers);
  }

  console.assert(isNotOccupiedByTransformableField<T>(prototype, key));

  transformers.push([key, transformer]);
}
