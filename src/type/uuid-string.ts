/**
 * @example
 * '00112233-4455-6677-8899-aabbccddeeff'
 */
export type UuidString = string & {readonly __uuidString: unique symbol};
