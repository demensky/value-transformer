import type {LittleEndianDataView} from '../type/little-endian-data-view.js';
import type {WriteonlyDataView} from '../type/writeonly-data-view.js';

export type DataViewChunkViewHandler = (
  view: LittleEndianDataView | WriteonlyDataView,
  offset: number,
) => void;
