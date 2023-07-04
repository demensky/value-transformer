import {HIGH_SURROGATE_MAX} from '../const/utf-8/high-surrogate-max.js';
import {HIGH_SURROGATE_MIN} from '../const/utf-8/high-surrogate-min.js';
import {LOW_SURROGATE_MAX} from '../const/utf-8/low-surrogate-max.js';
import {LOW_SURROGATE_MIN} from '../const/utf-8/low-surrogate-min.js';

/**
 * Checks if a Unicode code point is a high surrogate.
 */
function isHighSurrogate(code: number): boolean {
  return HIGH_SURROGATE_MIN <= code && code <= HIGH_SURROGATE_MAX;
}

/**
 * Checks if a Unicode code point is a low surrogate.
 */
function isLowSurrogate(code: number): boolean {
  return LOW_SURROGATE_MIN <= code && code <= LOW_SURROGATE_MAX;
}

/**
 * Checks if a string is well-formed, i.e., that it doesn't contain any unpaired
 * surrogate pairs.
 */
export function isWellFormed(value: string): boolean {
  for (let index = 0; index < value.length; index++) {
    const code: number = value.charCodeAt(index);

    if (isHighSurrogate(code)) {
      if (
        index === value.length - 1 ||
        !isLowSurrogate(value.charCodeAt(index + 1))
      ) {
        return false;
      }
      index++;
    } else if (isLowSurrogate(code)) {
      return false;
    }
  }

  return true;
}
