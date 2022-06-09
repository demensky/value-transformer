import {SparseArrayError} from '../error/sparse-array-error.js';

export function* denseArrayLike<T>(array: ArrayLike<T>): Iterable<T> {
  for (let index = 0; index < array.length; index++) {
    if (!(index in array)) {
      throw new SparseArrayError(index);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    yield array[index]!;
  }
}
