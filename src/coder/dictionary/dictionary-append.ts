export type DictionaryAppend<K, V, C> = (
  dictionary: C,
  key: K,
  value: V,
) => void;
