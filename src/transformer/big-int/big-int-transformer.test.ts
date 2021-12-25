import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';

import {BigIntTransformer} from './big-int-transformer';

describe('BigIntTransformer', () => {
  let transformer: BigIntTransformer;

  beforeAll(() => {
    transformer = new BigIntTransformer();
  });

  describe('compatibleWith', () => {
    test('boolean', () => {
      expect(transformer.compatibleWith(false)).toBe(false);
      expect(transformer.compatibleWith(true)).toBe(false);
    });

    test('nil', () => {
      expect(transformer.compatibleWith(null)).toBe(false);
      expect(transformer.compatibleWith(undefined)).toBe(false);
    });

    test('string', () => {
      expect(transformer.compatibleWith('')).toBe(false);
      expect(transformer.compatibleWith('0')).toBe(false);
      expect(transformer.compatibleWith('-0')).toBe(false);
      expect(transformer.compatibleWith('1')).toBe(false);
      expect(transformer.compatibleWith('-1')).toBe(false);
      expect(transformer.compatibleWith('42')).toBe(false);
    });

    test('number', () => {
      expect(transformer.compatibleWith(0)).toBe(false);
      expect(transformer.compatibleWith(1)).toBe(false);
      expect(transformer.compatibleWith(-1)).toBe(false);
      expect(transformer.compatibleWith(Infinity)).toBe(false);
      expect(transformer.compatibleWith(-Infinity)).toBe(false);
      expect(transformer.compatibleWith(NaN)).toBe(false);
    });

    test('object', () => {
      expect(transformer.compatibleWith({})).toBe(false);
      expect(transformer.compatibleWith([])).toBe(false);
    });

    test('boxed BigInt object', () => {
      expect(transformer.compatibleWith(Object(0n))).toBe(false);
    });

    test('bigint', () => {
      expect(transformer.compatibleWith(0n)).toBe(true);
      expect(transformer.compatibleWith(1n)).toBe(true);
      expect(transformer.compatibleWith(9007199254740992n)).toBe(true);
    });
  });

  describe('fromLiteral', () => {
    test('boolean', () => {
      expect(() => {
        transformer.fromLiteral(false);
      }).toThrow(IncompatibleLiteralError);
      expect(() => {
        transformer.fromLiteral(true);
      }).toThrow(IncompatibleLiteralError);
    });

    test('nil', () => {
      expect(() => {
        transformer.fromLiteral(null);
      }).toThrow(IncompatibleLiteralError);
      expect(() => {
        transformer.fromLiteral(undefined);
      }).toThrow(IncompatibleLiteralError);
    });

    test('number', () => {
      expect(() => {
        transformer.fromLiteral(0);
      }).toThrow(IncompatibleLiteralError);
      expect(() => {
        transformer.fromLiteral(1);
      }).toThrow(IncompatibleLiteralError);
      expect(() => {
        transformer.fromLiteral(-1);
      }).toThrow(IncompatibleLiteralError);
      expect(() => {
        transformer.fromLiteral(Infinity);
      }).toThrow(IncompatibleLiteralError);
      expect(() => {
        transformer.fromLiteral(-Infinity);
      }).toThrow(IncompatibleLiteralError);
      expect(() => {
        transformer.fromLiteral(NaN);
      }).toThrow(IncompatibleLiteralError);
    });

    test('object', () => {
      expect(() => {
        transformer.fromLiteral({});
      }).toThrow(IncompatibleLiteralError);
      expect(() => {
        transformer.fromLiteral([]);
      }).toThrow(IncompatibleLiteralError);
    });

    test('boxed BigInt object', () => {
      expect(() => {
        transformer.fromLiteral(Object(0n));
      }).toThrow(IncompatibleLiteralError);
    });

    test('bigint', () => {
      expect(() => {
        transformer.fromLiteral(0n);
      }).toThrow(IncompatibleLiteralError);
      expect(() => {
        transformer.fromLiteral(1n);
      }).toThrow(IncompatibleLiteralError);
      expect(() => {
        transformer.fromLiteral(9007199254740992n);
      }).toThrow(IncompatibleLiteralError);
    });

    describe('string', () => {
      test('decimal digits', () => {
        expect(transformer.fromLiteral('0')).toBe(0n);
        expect(transformer.fromLiteral('1')).toBe(1n);
        expect(transformer.fromLiteral('42')).toBe(42n);
        expect(transformer.fromLiteral('9007199254740991')).toBe(
          9007199254740991n,
        );
        expect(transformer.fromLiteral('18446744073709551615')).toBe(
          18446744073709551615n,
        );
        expect(
          transformer.fromLiteral('340282366920938463463374607431768211455'),
        ).toBe(340282366920938463463374607431768211455n);
      });

      test('minus and decimal digits', () => {
        expect(transformer.fromLiteral('-0')).toBe(0n);
        expect(transformer.fromLiteral('-1')).toBe(-1n);
        expect(transformer.fromLiteral('-42')).toBe(-42n);
        expect(transformer.fromLiteral('-9007199254740991')).toBe(
          -9007199254740991n,
        );
        expect(transformer.fromLiteral('-18446744073709551615')).toBe(
          -18446744073709551615n,
        );
        expect(
          transformer.fromLiteral('-340282366920938463463374607431768211455'),
        ).toBe(-340282366920938463463374607431768211455n);
      });

      test('empty string', () => {
        expect(() => {
          transformer.fromLiteral('');
        }).toThrow(IncompatibleLiteralError);
      });

      test('minus', () => {
        expect(() => {
          transformer.fromLiteral('-');
        }).toThrow(IncompatibleLiteralError);
      });

      test('letters', () => {
        expect(() => {
          transformer.fromLiteral('abc');
        }).toThrow(IncompatibleLiteralError);
      });

      test('decimal digits have spaces', () => {
        expect(() => {
          transformer.fromLiteral('  42');
        }).toThrow(IncompatibleLiteralError);
        expect(() => {
          transformer.fromLiteral('42  ');
        }).toThrow(IncompatibleLiteralError);
        expect(() => {
          transformer.fromLiteral('4  2');
        }).toThrow(IncompatibleLiteralError);
      });

      test('decimal digits have plus', () => {
        expect(() => {
          transformer.fromLiteral('+0');
        }).toThrow(IncompatibleLiteralError);
        expect(() => {
          transformer.fromLiteral('+1');
        }).toThrow(IncompatibleLiteralError);
        expect(() => {
          transformer.fromLiteral('+42');
        }).toThrow(IncompatibleLiteralError);
        expect(() => {
          transformer.fromLiteral('+9007199254740991');
        }).toThrow(IncompatibleLiteralError);
        expect(() => {
          transformer.fromLiteral('+18446744073709551615');
        }).toThrow(IncompatibleLiteralError);
      });
    });
  });

  describe('toLiteral', () => {
    test('zero', () => {
      expect(transformer.toLiteral(0n)).toBe('0');
    });

    test('positive', () => {
      expect(transformer.toLiteral(1n)).toBe('1');
      expect(transformer.toLiteral(42n)).toBe('42');
      expect(transformer.toLiteral(9007199254740991n)).toBe('9007199254740991');
      expect(transformer.toLiteral(18446744073709551615n)).toBe(
        '18446744073709551615',
      );
      expect(
        transformer.toLiteral(340282366920938463463374607431768211455n),
      ).toBe('340282366920938463463374607431768211455');
    });

    test('negative', () => {
      expect(transformer.toLiteral(-1n)).toBe('-1');
      expect(transformer.toLiteral(-42n)).toBe('-42');
      expect(transformer.toLiteral(-9007199254740991n)).toBe(
        '-9007199254740991',
      );
      expect(transformer.toLiteral(-18446744073709551615n)).toBe(
        '-18446744073709551615',
      );
      expect(
        transformer.toLiteral(-340282366920938463463374607431768211455n),
      ).toBe('-340282366920938463463374607431768211455');
    });
  });
});
