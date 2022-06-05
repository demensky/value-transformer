import type {EnumLike} from './enum-like.js';

export type EnumDefinition<K extends string, V extends EnumLike> = {
  readonly [F in K]: V;
};
