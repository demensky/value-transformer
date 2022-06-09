/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/consistent-type-assertions */

import type {TransformableField} from './transformable-field.js';
import type {TransformableFieldsMapContract} from './transformable-fields-map-contract.js';

export const transformableFieldsMap: TransformableFieldsMapContract =
  new WeakMap<object, TransformableField<string, unknown, unknown>[]>() as any;
