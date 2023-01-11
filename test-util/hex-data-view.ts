/* istanbul ignore file */

import type {RestrictedDataView} from '../src/type/restricted-data-view.js';

import {hexUint8} from './hex-uint8.js';

export function hexDataView(bytes: string): RestrictedDataView {
  return new DataView(hexUint8(bytes).buffer);
}
