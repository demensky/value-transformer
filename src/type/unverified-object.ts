export type UnverifiedObject<T extends object> = {
  readonly [P in keyof T]?: unknown;
};
