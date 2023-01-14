import type {ValueTransformer} from '../value/value-transformer.js';

import {MapTransformer} from './map-transformer.js';

export function asMap<KI, KO extends KI, VI, VO extends VI>(
  keyTransformer: ValueTransformer<KI, KO>,
  valueTransformer: ValueTransformer<VI, VO>,
): MapTransformer<KI, KO, VI, VO> {
  return new MapTransformer<KI, KO, VI, VO>(keyTransformer, valueTransformer);
}
