import '../../jest/to-be-compatible-with';
import '../../jest/to-be-transformation';
import '../../jest/to-throw-incompatible-literal';

import {BigIntTransformer} from './big-int-transformer';

describe('BigIntTransformer', () => {
  let transformer: BigIntTransformer;

  beforeAll(() => {
    transformer = new BigIntTransformer();
  });

  describe('data compatibility check', () => {
    test('boolean', () => {
      expect(transformer).not.toBeCompatibleWith(false);
      expect(transformer).not.toBeCompatibleWith(true);
    });

    test('nil', () => {
      expect(transformer).not.toBeCompatibleWith(null);
      expect(transformer).not.toBeCompatibleWith(undefined);
    });

    test('string', () => {
      expect(transformer).not.toBeCompatibleWith('');
      expect(transformer).not.toBeCompatibleWith('0');
      expect(transformer).not.toBeCompatibleWith('-0');
      expect(transformer).not.toBeCompatibleWith('1');
      expect(transformer).not.toBeCompatibleWith('-1');
      expect(transformer).not.toBeCompatibleWith('42');
    });

    test('number', () => {
      expect(transformer).not.toBeCompatibleWith(0);
      expect(transformer).not.toBeCompatibleWith(1);
      expect(transformer).not.toBeCompatibleWith(-1);
      expect(transformer).not.toBeCompatibleWith(Infinity);
      expect(transformer).not.toBeCompatibleWith(-Infinity);
      expect(transformer).not.toBeCompatibleWith(NaN);
    });

    test('object', () => {
      expect(transformer).not.toBeCompatibleWith({});
      expect(transformer).not.toBeCompatibleWith([]);
    });

    test('boxed BigInt object', () => {
      expect(transformer).not.toBeCompatibleWith(Object(0n));
    });

    test('bigint', () => {
      expect(transformer).toBeCompatibleWith(0n);
      expect(transformer).toBeCompatibleWith(1n);
      expect(transformer).toBeCompatibleWith(9007199254740992n);
    });
  });

  describe('incompatible literal', () => {
    test('boolean', () => {
      expect(transformer).toThrowIncompatibleLiteral(false);
      expect(transformer).toThrowIncompatibleLiteral(true);
    });

    test('nil', () => {
      expect(transformer).toThrowIncompatibleLiteral(null);
      expect(transformer).toThrowIncompatibleLiteral(undefined);
    });

    test('number', () => {
      expect(transformer).toThrowIncompatibleLiteral(0);
      expect(transformer).toThrowIncompatibleLiteral(1);
      expect(transformer).toThrowIncompatibleLiteral(-1);
      expect(transformer).toThrowIncompatibleLiteral(Infinity);
      expect(transformer).toThrowIncompatibleLiteral(-Infinity);
      expect(transformer).toThrowIncompatibleLiteral(NaN);
    });

    test('object', () => {
      expect(transformer).toThrowIncompatibleLiteral({});
      expect(transformer).toThrowIncompatibleLiteral([]);
    });

    test('boxed BigInt object', () => {
      expect(transformer).toThrowIncompatibleLiteral(Object(0n));
    });

    test('bigint', () => {
      expect(transformer).toThrowIncompatibleLiteral(0n);
      expect(transformer).toThrowIncompatibleLiteral(1n);
      expect(transformer).toThrowIncompatibleLiteral(9007199254740992n);
    });

    describe('string', () => {
      test('empty string', () => {
        expect(transformer).toThrowIncompatibleLiteral('');
      });

      test('minus', () => {
        expect(transformer).toThrowIncompatibleLiteral('-');
      });

      test('letters', () => {
        expect(transformer).toThrowIncompatibleLiteral('abc');
      });

      test('decimal digits have spaces', () => {
        expect(transformer).toThrowIncompatibleLiteral('  42');
        expect(transformer).toThrowIncompatibleLiteral('42  ');
        expect(transformer).toThrowIncompatibleLiteral('4  2');
      });

      test('decimal digits have plus', () => {
        expect(transformer).toThrowIncompatibleLiteral('+0');
        expect(transformer).toThrowIncompatibleLiteral('+1');
        expect(transformer).toThrowIncompatibleLiteral('+42');
        expect(transformer).toThrowIncompatibleLiteral('+9007199254740991');
        expect(transformer).toThrowIncompatibleLiteral('+18446744073709551615');
      });
    });
  });

  describe('transformation', () => {
    test('zero', () => {
      expect(transformer).toBeTransformation(0n, '0', '0');
    });

    test('positive', () => {
      expect(transformer).toBeTransformation(1n, '1', '1');
      expect(transformer).toBeTransformation(42n, '42', '42');
      expect(transformer).toBeTransformation(
        9007199254740991n,
        '9007199254740991',
        '9007199254740991',
      );
      expect(transformer).toBeTransformation(
        18446744073709551615n,
        '18446744073709551615',
        '18446744073709551615',
      );
      expect(transformer).toBeTransformation(
        340282366920938463463374607431768211455n,
        '340282366920938463463374607431768211455',
        '340282366920938463463374607431768211455',
      );
    });

    test('negative', () => {
      expect(transformer).toBeTransformation(-1n, '-1', '-1');
      expect(transformer).toBeTransformation(-42n, '-42', '-42');
      expect(transformer).toBeTransformation(
        -9007199254740991n,
        '-9007199254740991',
        '-9007199254740991',
      );
      expect(transformer).toBeTransformation(
        -18446744073709551615n,
        '-18446744073709551615',
        '-18446744073709551615',
      );
      expect(transformer).toBeTransformation(
        -340282366920938463463374607431768211455n,
        '-340282366920938463463374607431768211455',
        '-340282366920938463463374607431768211455',
      );
    });
  });
});
