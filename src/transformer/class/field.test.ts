import 'reflect-metadata';

import {asMock} from '../mock/as-mock';

import {CLASS_TRANSFORMER_FIELD_TRANSFORMER} from './class-transformer-field-transformer';
import {CLASS_TRANSFORMER_KEYS} from './class-transformer-keys';
import {field} from './field';

describe('ClassTransformer @field decorator', () => {
  test('just class', () => {
    const transformerA = asMock(true, null, null, null);
    const transformerB = asMock(true, null, null, null);

    class Tmp {
      @field(transformerA) public a: unknown;

      @field(transformerB) public b: unknown;
    }

    expect(
      Reflect.getOwnMetadata(CLASS_TRANSFORMER_KEYS, Tmp.prototype),
    ).toStrictEqual(['a', 'b']);

    expect(
      Reflect.getOwnMetadata(
        CLASS_TRANSFORMER_FIELD_TRANSFORMER,
        Tmp.prototype,
        'a',
      ),
    ).toBe(transformerA);

    expect(
      Reflect.getOwnMetadata(
        CLASS_TRANSFORMER_FIELD_TRANSFORMER,
        Tmp.prototype,
        'b',
      ),
    ).toBe(transformerB);
  });

  test('class extend class', () => {
    const transformerA = asMock(true, null, null, null);
    const transformerB = asMock(true, null, null, null);

    abstract class TmpSuper {
      @field(transformerA) public a: unknown;
    }

    class TmpRecipient extends TmpSuper {
      @field(transformerB) public b: unknown;
    }

    expect(
      Reflect.getOwnMetadata(CLASS_TRANSFORMER_KEYS, TmpRecipient.prototype),
    ).toStrictEqual(['a', 'b']);

    expect(
      Reflect.getOwnMetadata(
        CLASS_TRANSFORMER_FIELD_TRANSFORMER,
        TmpRecipient.prototype,
        'a',
      ),
    ).not.toBe(transformerA);

    expect(
      Reflect.getMetadata(
        CLASS_TRANSFORMER_FIELD_TRANSFORMER,
        TmpRecipient.prototype,
        'a',
      ),
    ).toBe(transformerA);

    expect(
      Reflect.getOwnMetadata(
        CLASS_TRANSFORMER_FIELD_TRANSFORMER,
        TmpRecipient.prototype,
        'b',
      ),
    ).toBe(transformerB);
  });
});
