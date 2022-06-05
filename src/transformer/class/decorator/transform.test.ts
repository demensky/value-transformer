import {asMock} from '../../mock/as-mock.js';
import type {MockTransformer} from '../../mock/mock-transformer.js';

import {transform} from './transform.js';
import {transformableFieldsMap} from './transformable-fields-map.js';

describe('ClassTransformer @transform decorator', () => {
  let transformerA: MockTransformer<unknown>;
  let transformerB: MockTransformer<unknown>;

  beforeEach(() => {
    transformerA = asMock(true, null, null, null);
    transformerB = asMock(true, null, null, null);
  });

  describe('just class', () => {
    test('successfully', () => {
      class Tmp {
        @transform(transformerA) public a: unknown;

        @transform(transformerB) public b: unknown;
      }

      expect([...transformableFieldsMap.get(Tmp.prototype)]).toStrictEqual([
        ['a', transformerA],
        ['b', transformerB],
      ]);
    });
  });

  describe('class extends class', () => {
    test('successfully', () => {
      abstract class TmpSuper {
        @transform(transformerA) public a: unknown;
      }

      class TmpRecipient extends TmpSuper {
        @transform(transformerB) public b: unknown;
      }

      expect([...transformableFieldsMap.get(TmpSuper.prototype)]).toStrictEqual(
        [['a', transformerA]],
      );

      expect([
        ...transformableFieldsMap.get(TmpRecipient.prototype),
      ]).toStrictEqual([['b', transformerB]]);
    });
  });
});
