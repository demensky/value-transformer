import type {ValueTransformer} from '../../base/value-transformer';

import {MapTransformer} from './map-transformer';

export function asMap<KI, KO extends KI, VI, VO extends VI>(
  keyTransformer: ValueTransformer<KI, KO>,
  valueTransformer: ValueTransformer<VI, VO>,
): MapTransformer<KI, KO, VI, VO> {
  return new MapTransformer<KI, KO, VI, VO>(keyTransformer, valueTransformer);
}
