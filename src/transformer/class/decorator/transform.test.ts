import {expect, test} from 'vitest';

import {asMock} from '../../../../test-util/as-mock.js';

import {transform} from './transform.js';
import {transformableFieldsMap} from './transformable-fields-map.js';

test('just class', () => {
  class Tmp {
    @transform(asMock(true, 'a-d', [0x0a], 'a-l', 'a-c')) public a = 'a-d';

    @transform(asMock(true, 'b-d', [0x0b], 'b-l', 'b-c')) public b = 'b-d';
  }

  expect(transformableFieldsMap.get(Tmp.prototype)).toStrictEqual([
    ['a', asMock(true, 'a-d', [0x0a], 'a-l', 'a-c')],
    ['b', asMock(true, 'b-d', [0x0b], 'b-l', 'b-c')],
  ]);
});

test('class extends class', () => {
  abstract class TmpSuper {
    @transform(asMock(true, 'a-d', [0x0a], 'a-l', 'a-c')) public a = 'a-d';
  }

  class TmpRecipient extends TmpSuper {
    @transform(asMock(true, 'b-d', [0x0b], 'b-l', 'b-c')) public b = 'b-d';
  }

  expect(transformableFieldsMap.get(TmpSuper.prototype)).toStrictEqual([
    ['a', asMock(true, 'a-d', [0x0a], 'a-l', 'a-c')],
  ]);

  expect(transformableFieldsMap.get(TmpRecipient.prototype)).toStrictEqual([
    ['b', asMock(true, 'b-d', [0x0b], 'b-l', 'b-c')],
  ]);
});
