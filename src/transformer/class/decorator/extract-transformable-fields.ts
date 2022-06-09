import {prototypeChain} from '../../../util/prototype-chain.js';

import type {OneOfTransformableField} from './one-of-transformable-field.js';
import {transformableFieldsMap} from './transformable-fields-map.js';

export function* extractTransformableFields<T extends object>(
  prototype: T,
): Iterable<OneOfTransformableField<T>> {
  for (const currentPrototype of prototypeChain(prototype)) {
    const fieldsInfo: readonly OneOfTransformableField<T>[] | undefined =
      transformableFieldsMap.get<T>(currentPrototype);

    if (fieldsInfo === undefined) {
      continue;
    }

    yield* fieldsInfo;
  }
}
