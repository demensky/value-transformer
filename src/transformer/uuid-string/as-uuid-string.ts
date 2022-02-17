import type {UuidString} from '../../type/uuid-string';

import {UuidStringTransformer} from './uuid-string-transformer';

export function asUuidString<T extends UuidString>(): UuidStringTransformer<T> {
  return new UuidStringTransformer<T>();
}
