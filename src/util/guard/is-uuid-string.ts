import type {UuidString} from '../../type/uuid-string';

const UUID_REGEX = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/;

/**
 * Checks that `value` is: a string representation of uuid, all characters are
 * lowercase and does not contain whitespace.
 */
export function isUuidString<T extends UuidString>(value: string): value is T {
  return UUID_REGEX.test(value);
}
