// TODO find way to avoid any
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument */

import {isNotOccupiedByTransformableField} from '../../util/is-not-occupied-by-transformable-field.js';
import type {OneOfTransformableField} from '../class/decorator/one-of-transformable-field.js';
import {transformableFieldsMap} from '../class/decorator/transformable-fields-map.js';

import type {ValueTransformer} from './value-transformer.js';
import type {ValueTransformerDecorator} from './value-transformer-decorator.js';

export function createValueTransformerDecorator<I, O extends I>(
  transformer: ValueTransformer<I, O>,
): ValueTransformerDecorator<I, O> {
  return (prototype: any, key: any): any => {
    if (prototype === null && key === null) {
      return transformer;
    }

    let transformers: OneOfTransformableField<any>[] | undefined =
      transformableFieldsMap.get<any>(prototype);

    if (transformers === undefined) {
      transformers = [];
      transformableFieldsMap.set<any>(prototype, transformers);
    }

    console.assert(isNotOccupiedByTransformableField<any>(prototype, key));

    transformers.push([key, transformer]);
  };
}
