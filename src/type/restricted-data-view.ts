import type {LittleEndianDataView} from './little-endian-data-view.js';
import type {ReadonlyDataView} from './readonly-data-view.js';

/**
 * @see {@linkcode DataView}
 */
export type RestrictedDataView = LittleEndianDataView | ReadonlyDataView;
