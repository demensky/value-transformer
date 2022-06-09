import type {TransformableField} from './transformable-field.js';

export type OneOfTransformableField<T extends object> = {
  readonly [K in string & keyof T]: TransformableField<K, T[K], T[K]>;
}[string & keyof T];
