import type {Encoding} from '../../type/encoding.js';

export function* float64Encoder(value: number): Encoding {
  (yield Float64Array.BYTES_PER_ELEMENT).setView((view, offset) => {
    view.setFloat64(offset, value, true);
  });
}
