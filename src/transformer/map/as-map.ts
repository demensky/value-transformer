import {createValueTransformerDecorator} from '../value/create-value-transformer-decorator.js';
import {normalizeValueTransformer} from '../value/normalize-value-transformer.js';
import type {ValueTransformerDecorator} from '../value/value-transformer-decorator.js';
import type {ValueTransformerLike} from '../value/value-transformer-like.js';

import {MapTransformer} from './map-transformer.js';

export function asMap<KI, KO extends KI, VI, VO extends VI>(
  keyTransformer: ValueTransformerLike<KI, KO>,
  valueTransformer: ValueTransformerLike<VI, VO>,
): ValueTransformerDecorator<ReadonlyMap<KI, VI>, Map<KO, VO>> {
  return createValueTransformerDecorator<ReadonlyMap<KI, VI>, Map<KO, VO>>(
    new MapTransformer<KI, KO, VI, VO>(
      normalizeValueTransformer(keyTransformer),
      normalizeValueTransformer(valueTransformer),
    ),
  );
}
