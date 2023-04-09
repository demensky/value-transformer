import {transformableFieldsMap} from '../transformer/class/decorator/transformable-fields-map.js';

export function isNotOccupiedByTransformableField<T extends object>(
  prototype: T,
  key: keyof T,
): boolean {
  const fields = transformableFieldsMap.get<T>(prototype) ?? [];

  if (fields.some(([itemKey]) => key === itemKey)) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parent: T | null = Object.getPrototypeOf(prototype);

  return (
    parent === null ||
    parent === Object.prototype ||
    isNotOccupiedByTransformableField<T>(parent, key)
  );
}
