import test from 'ava';

import {asMock} from '../../../../test-util/as-mock.js';

import {transform} from './transform.js';
import {transformableFieldsMap} from './transformable-fields-map.js';

test('just class', (t) => {
  class Tmp {
    @transform(asMock(true, 'a-d', 'a-l', 'a-c')) public a = 'a-d';

    @transform(asMock(true, 'b-d', 'b-l', 'b-c')) public b = 'b-d';
  }

  t.deepEqual(transformableFieldsMap.get(Tmp.prototype), [
    ['a', asMock(true, 'a-d', 'a-l', 'a-c')],
    ['b', asMock(true, 'b-d', 'b-l', 'b-c')],
  ]);
});

test('class extends class', (t) => {
  abstract class TmpSuper {
    @transform(asMock(true, 'a-d', 'a-l', 'a-c')) public a = 'a-d';
  }

  class TmpRecipient extends TmpSuper {
    @transform(asMock(true, 'b-d', 'b-l', 'b-c')) public b = 'b-d';
  }

  t.deepEqual(transformableFieldsMap.get(TmpSuper.prototype), [
    ['a', asMock(true, 'a-d', 'a-l', 'a-c')],
  ]);

  t.deepEqual(transformableFieldsMap.get(TmpRecipient.prototype), [
    ['b', asMock(true, 'b-d', 'b-l', 'b-c')],
  ]);
});
