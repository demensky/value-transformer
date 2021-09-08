/// <reference types="reflect-metadata" />

import type {ValueTransformer} from '../../base/value-transformer';
import type {ExactPropertyDecorator} from '../../type/exact-property-decorator';

import {CLASS_TRANSFORMER_FIELD_TRANSFORMER} from './class-transformer-field-transformer';
import {CLASS_TRANSFORMER_KEYS} from './class-transformer-keys';

export function field<I, O extends I>(
  transformer: ValueTransformer<I, O>,
): ExactPropertyDecorator<I | O, string> {
  return (prototype, key) => {
    Reflect.defineMetadata(
      CLASS_TRANSFORMER_FIELD_TRANSFORMER,
      transformer,
      prototype,
      key,
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let keys: string[] | undefined = Reflect.getOwnMetadata(
      CLASS_TRANSFORMER_KEYS,
      prototype,
    );

    if (keys === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const notOwnMetadata: readonly string[] | undefined = Reflect.getMetadata(
        CLASS_TRANSFORMER_KEYS,
        prototype,
      );

      keys = notOwnMetadata === undefined ? [] : [...notOwnMetadata];

      Reflect.defineMetadata(CLASS_TRANSFORMER_KEYS, keys, prototype);
    }

    if (keys.includes(key)) {
      throw new Error('There is already a transformer on this field');
    }

    keys.push(key);
  };
}
