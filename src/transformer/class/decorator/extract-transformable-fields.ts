// TODO find way to avoid any
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type {OneOfTransformableField} from './one-of-transformable-field.js';
import {transformableFieldsMap} from './transformable-fields-map.js';
import type {TransformableFieldsMapContract} from './transformable-fields-map-contract.js';

const cache: TransformableFieldsMapContract = new WeakMap();

export function extractTransformableFields<T extends object>(
  prototype: T,
): readonly OneOfTransformableField<T>[] {
  let result: OneOfTransformableField<T>[] | undefined =
    cache.get<T>(prototype);

  if (result === undefined) {
    const parent: T | null = Object.getPrototypeOf(prototype);
    const fields: OneOfTransformableField<T>[] =
      transformableFieldsMap.get<T>(prototype) ?? [];

    result =
      parent === null || parent === Object.prototype
        ? fields
        : [...extractTransformableFields(parent), ...fields];

    cache.set(prototype, result);
  }

  return result;
}
