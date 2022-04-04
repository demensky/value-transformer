import 'reflect-metadata';

import {asMock} from '../mock/as-mock';
import type {MockTransformer} from '../mock/mock-transformer';

import {CLASS_TRANSFORMER_FIELD_TRANSFORMER} from './class-transformer-field-transformer';
import {CLASS_TRANSFORMER_KEYS} from './class-transformer-keys';
import {field} from './field';

describe('ClassTransformer @field decorator', () => {
  let transformerA: MockTransformer<unknown>;
  let transformerB: MockTransformer<unknown>;

  beforeEach(() => {
    transformerA = asMock(true, null, null, null);
    transformerB = asMock(true, null, null, null);
  });

  describe('just class', () => {
    test('successfully', () => {
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

    test('throw error if multiple decorators on same field', () => {
      expect(() => {
        class Tmp {
          @field(transformerA) @field(transformerB) public a: unknown;
        }

        void Tmp;
      }).toThrow();
    });
  });

  describe('class extends class', () => {
    test('successfully', () => {
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

    test('throw error if multiple decorators on same field', () => {
      abstract class TmpSuper {
        @field(transformerA) public a: unknown;
      }

      expect(() => {
        class TmpRecipient extends TmpSuper {
          @field(transformerB) public override a: unknown;
        }

        void TmpRecipient;
      }).toThrow();
    });
  });
});
