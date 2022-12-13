/**
 * @see {@link Date}
 */
export interface ReadonlyDate {
  /**
   * @see {@link Date#toString}
   */
  toString(): string;

  /**
   * @see {@link Date#toDateString}
   */
  toDateString(): string;

  /**
   * @see {@link Date#toTimeString}
   */
  toTimeString(): string;

  /**
   * @see {@link Date#toLocaleString}
   */
  toLocaleString(): string;

  /**
   * @see {@link Date#toLocaleDateString}
   */
  toLocaleDateString(): string;

  /**
   * @see {@link Date#toLocaleTimeString}
   */
  toLocaleTimeString(): string;

  /**
   * @see {@link Date#valueOf}
   */
  valueOf(): number;

  /**
   * @see {@link Date#getTime}
   */
  getTime(): number;

  /**
   * @see {@link Date#getFullYear}
   */
  getFullYear(): number;

  /**
   * @see {@link Date#getUTCFullYear}
   */
  getUTCFullYear(): number;

  /**
   * @see {@link Date#getMonth}
   */
  getMonth(): number;

  /**
   * @see {@link Date#getUTCMonth}
   */
  getUTCMonth(): number;

  /**
   * @see {@link Date#getDate}
   */
  getDate(): number;

  /**
   * @see {@link Date#getUTCDate}
   */
  getUTCDate(): number;

  /**
   * @see {@link Date#getDay}
   */
  getDay(): number;

  /**
   * @see {@link Date#getUTCDay}
   */
  getUTCDay(): number;

  /**
   * @see {@link Date#getHours}
   */
  getHours(): number;

  /**
   * @see {@link Date#getUTCHours}
   */
  getUTCHours(): number;

  /**
   * @see {@link Date#getMinutes}
   */
  getMinutes(): number;

  /**
   * @see {@link Date#getUTCMinutes}
   */
  getUTCMinutes(): number;

  /**
   * @see {@link Date#getSeconds}
   */
  getSeconds(): number;

  /**
   * @see {@link Date#getUTCSeconds}
   */
  getUTCSeconds(): number;

  /**
   * @see {@link Date#getMilliseconds}
   */
  getMilliseconds(): number;

  /**
   * @see {@link Date#getUTCMilliseconds}
   */
  getUTCMilliseconds(): number;

  /**
   * @see {@link Date#getTimezoneOffset}
   */
  getTimezoneOffset(): number;

  /**
   * @see {@link Date#toUTCString}
   */
  toUTCString(): string;

  /**
   * @see {@link Date#toISOString}
   */
  toISOString(): string;

  /**
   * @see {@link Date#toJSON}
   */
  toJSON(key?: unknown): string;
}
