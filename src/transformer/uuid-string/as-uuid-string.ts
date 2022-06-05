import type {UuidString} from '../../type/uuid-string.js';

import {UuidStringTransformer} from './uuid-string-transformer.js';

export function asUuidString<T extends UuidString>(): UuidStringTransformer<T> {
  return new UuidStringTransformer<T>();
}
