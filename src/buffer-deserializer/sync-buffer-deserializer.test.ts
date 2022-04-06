import {deserialize} from '../jest/deserialize';
import type {DecoderGenerator} from '../type/decoder-generator';
import type {ReadonlyLittleEndianDataView} from '../type/readonly-little-endian-data-view';

function* mockDecoder(
  counts: readonly number[],
): DecoderGenerator<readonly (readonly number[])[]> {
  const result: (readonly number[])[] = [];

  for (const count of counts) {
    const dataView: ReadonlyLittleEndianDataView = yield count;

    result.push([
      ...new Uint8Array(
        dataView.buffer,
        dataView.byteOffset,
        dataView.byteLength,
      ),
    ]);
  }

  return result;
}

describe('SyncBufferDeserializer', () => {
  describe('single chunk', () => {
    test('1 1 1 1 1 1', () => {
      expect(
        deserialize(
          [[0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]],
          mockDecoder([1, 1, 1, 1, 1, 1]),
        ),
      ).toStrictEqual([[0x0a], [0x0b], [0x0c], [0x0d], [0x0e], [0x0f]]);
    });

    test('1 2 3', () => {
      expect(
        deserialize(
          [[0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]],
          mockDecoder([1, 2, 3]),
        ),
      ).toStrictEqual([[0x0a], [0x0b, 0x0c], [0x0d, 0x0e, 0x0f]]);
    });

    test('2 2 2', () => {
      expect(
        deserialize(
          [[0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]],
          mockDecoder([2, 2, 2]),
        ),
      ).toStrictEqual([
        [0x0a, 0x0b],
        [0x0c, 0x0d],
        [0x0e, 0x0f],
      ]);
    });

    test('6', () => {
      expect(
        deserialize([[0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]], mockDecoder([6])),
      ).toStrictEqual([[0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]]);
    });
  });

  describe('two chunks', () => {
    test('1 1 1 1 1 1', () => {
      expect(
        deserialize(
          [
            [0x0a, 0x0b, 0x0c],
            [0x0d, 0x0e, 0x0f],
          ],
          mockDecoder([1, 1, 1, 1, 1, 1]),
        ),
      ).toStrictEqual([[0x0a], [0x0b], [0x0c], [0x0d], [0x0e], [0x0f]]);
    });

    test('4 2', () => {
      expect(
        deserialize(
          [
            [0x0a, 0x0b, 0x0c],
            [0x0d, 0x0e, 0x0f],
          ],
          mockDecoder([4, 2]),
        ),
      ).toStrictEqual([
        [0x0a, 0x0b, 0x0c, 0x0d],
        [0x0e, 0x0f],
      ]);
    });

    test('2 2 2', () => {
      expect(
        deserialize(
          [
            [0x0a, 0x0b, 0x0c],
            [0x0d, 0x0e, 0x0f],
          ],
          mockDecoder([2, 2, 2]),
        ),
      ).toStrictEqual([
        [0x0a, 0x0b],
        [0x0c, 0x0d],
        [0x0e, 0x0f],
      ]);
    });

    test('2 4', () => {
      expect(
        deserialize(
          [
            [0x0a, 0x0b, 0x0c],
            [0x0d, 0x0e, 0x0f],
          ],
          mockDecoder([2, 4]),
        ),
      ).toStrictEqual([
        [0x0a, 0x0b],
        [0x0c, 0x0d, 0x0e, 0x0f],
      ]);
    });
  });

  describe('three chunks', () => {
    test('1 4 1', () => {
      expect(
        deserialize(
          [
            [0x0a, 0x0b],
            [0x0c, 0x0d],
            [0x0e, 0x0f],
          ],
          mockDecoder([1, 4, 1]),
        ),
      ).toStrictEqual([[0x0a], [0x0b, 0x0c, 0x0d, 0x0e], [0x0f]]);
    });
  });
});
