import test from 'ava';

import {isInvalidDate} from './is-invalid-date.js';

test('valid date', (t) => {
  t.false(isInvalidDate(new Date(0)));
});

test('invalid date', (t) => {
  t.true(isInvalidDate(new Date(NaN)));
});
