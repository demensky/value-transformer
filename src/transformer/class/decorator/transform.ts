import type {ValueTransformer} from '../../../base/value-transformer.js';
import type {TransformableFieldDecorator} from '../../../type/transformable-field-decorator.js';

import {defineTransformableField} from './define-transformable-field.js';

/**
 * @see {@link asClass}
 */
export function transform<I, O extends I>(
  transformer: ValueTransformer<I, O>,
): TransformableFieldDecorator<I, O> {
  return (prototype, key) => {
    // TODO avoid `as any`
    // eslint-disable-next-line
    defineTransformableField(prototype, key, transformer as any);
  };
}
