export type Unverified<T extends object> = {
  readonly [P in keyof T]?: unknown;
};
