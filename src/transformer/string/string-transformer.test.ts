import '../../jest/to-be-compatible-with';
import '../../jest/to-be-transformation';

import {StringTransformer} from './string-transformer';

describe('StringTransformer', () => {
  let transformer: StringTransformer;

  beforeAll(() => {
    transformer = new StringTransformer();
  });

  test('empty string', () => {
    expect(transformer).toBeTransformation('', '', '', [0x00]);
  });

  test('simple string', () => {
    expect(transformer).toBeTransformation(
      'foo',
      'foo',
      'foo',
      [0x03, 0x66, 0x6f, 0x6f],
    );
  });

  // \u0000
  test('null', () => {
    expect(transformer).toBeTransformation('\0', '\0', '\0', [0x01, 0x00]);
  });

  test('break line', () => {
    expect(transformer).toBeTransformation(
      '\r\n',
      '\r\n',
      '\r\n',
      [0x02, 0x0d, 0x0a],
    );
  });
});
