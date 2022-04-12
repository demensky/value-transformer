import type {OneOfTransformableField} from './one-of-transformable-field';

export interface TransformableFieldsMapContract {
  get<T extends object>(prototype: T): OneOfTransformableField<T>[];

  set<T extends object>(
    prototype: T,
    value: OneOfTransformableField<T>[],
  ): unknown;
}
