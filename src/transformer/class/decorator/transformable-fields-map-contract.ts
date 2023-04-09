import type {OneOfTransformableField} from './one-of-transformable-field.js';

export interface TransformableFieldsMapContract {
  get<T extends object>(prototype: T): OneOfTransformableField<T>[] | undefined;

  set<T extends object>(
    prototype: T,
    value: OneOfTransformableField<T>[],
  ): unknown;
}
