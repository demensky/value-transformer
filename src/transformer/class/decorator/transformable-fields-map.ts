/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/consistent-type-assertions */

import type {TransformableField} from './transformable-field';
import type {TransformableFieldsMapContract} from './transformable-fields-map-contract';

export const transformableFieldsMap: TransformableFieldsMapContract =
  new WeakMap<object, TransformableField<string, unknown, unknown>[]>() as any;
