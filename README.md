# value-transformer

**Warning!** This library is at an early stage of development. The API may
change without backwards compatibility.

This library allows you to serialize/deserialize complex data using
[transformers](#transformers). There is no need to interact with the raw
representation: the signature of JSON literals and `ArrayBuffer`s is
encapsulated.

[![CI](https://github.com/demensky/value-transformer/actions/workflows/ci.yml/badge.svg)](https://github.com/demensky/value-transformer/actions/workflows/ci.yml)

## Example

```ts
export class VectorPictureDto {
  @transform(asString())
  public readonly url: string;

  public constructor(url: VectorPictureDto['url']) {
    this.url = url;
  }
}

export class BitmapPictureDto {
  @transform(asMap(asString(), asString()))
  public readonly urls: ReadonlyMap<string, string>;

  public constructor(urls: BitmapPictureDto['urls']) {
    this.urls = urls;
  }
}

export class PictureDto {
  @transform(asDate())
  public readonly createAt: ReadonlyDate;

  @transform(asFloat64())
  public readonly rating: number;

  @transform(asSet(asString()))
  public readonly tags: ReadonlySet<string>;

  @transform(asUnion([asClass(BitmapPictureDto), asClass(VectorPictureDto)]))
  public readonly type: BitmapPictureDto | VectorPictureDto;

  public constructor(
    createAt: PictureDto['createAt'],
    rating: PictureDto['rating'],
    tags: PictureDto['tags'],
    type: PictureDto['type'],
  ) {
    this.createAt = createAt;
    this.rating = rating;
    this.tags = tags;
    this.type = type;
  }
}

const transformer = asClass(PictureDto);
```

## API

[All transformers](#transformers) implement the methods (listed below) in the
abstract class [`ValueTransformer`][value-transformer].

### `compatibleWith(data)`

Check compatibility with the type.

### `decoder()`

TODO doc

### `encode(data)`

TODO doc

### `fromLiteral(literal)`

Strictly check the literal for validity and deserialize it into data.

### `toLiteral(data, compact)`

Serialize the passed data into a JSON-like literal.

## Transformers

### Simple transformers

| Name        | Type                 | Usage example |
| ----------- | -------------------- | ------------- |
| `asBoolean` | [`boolean`][boolean] | `asBoolean()` |
| `asFloat64` | [`number`][number]   | `asFloat64()` |
| `asInt8`    | [`number`][number]   | `asInt8()`    |
| `asInt16`   | [`number`][number]   | `asInt16()`   |
| `asInt32`   | [`number`][number]   | `asInt32()`   |
| `asUint8`   | [`number`][number]   | `asUint8()`   |
| `asUint16`  | [`number`][number]   | `asUint16()`  |
| `asUint32`  | [`number`][number]   | `asUint32()`  |
| `asBigInt`  | [`bigint`][bigint]   | `asBigInt()`  |
| `asString`  | [`string`][string]   | `asString()`  |
| `asDate`    | [`Date`][date]       | `asDate()`    |
| `asRegExp`  | [`RegExp`][regexp]   | `asRegExp()`  |

### Collection transformers

| Name      | Type             | Usage example                   |
| --------- | ---------------- | ------------------------------- |
| `asArray` | [`Array`][array] | `asArray(asString())`           |
| `asSet`   | [`Set`][set]     | `asSet(asString())`             |
| `asMap`   | [`Map`][map]     | `asMap(asString(), asString())` |

### `asNever`

Blocks any transformations.

<details>
<summary>Usage</summary>

The value can only be `null`:

```ts
const transformer = asNullable(asNever());
```

Ensuring that the [collection](#collection-transformers) is empty:

```ts
const transformer = asArray(asNever());
```

```ts
const transformer = asSet(asNever());
```

```ts
const transformer = asMap(asNever(), asNever());
```

As a stub when updating variants in [`asUnion`](#asunion):

```ts
// version 1
const transformer = asUnion([
  asClass(MediaDto), // actual in version 1
  asClass(BinaryFileDto), // index is 1
]);
```

```ts
// version 2
const transformer = asUnion([
  asNever(), // unactual in version 2
  asClass(BinaryFileDto), // index still 1
  asClass(VideoDto),
  asClass(AudioDto),
]);
```

</details>

### `asUnion`

Combines several transformers. The first transformer passed
[`compatibleWith`](#compatiblewithdata) is used for serialization.

<details>
<summary>Usage</summary>

String or number:

```ts
const transformer = asUnion([asString(), asFloat64()]);
```

String or array of strings:

```ts
const transformer = asUnion([asString(), asArray(asString())]);
```

Classes:

```ts
const transformer = asUnion([
  asClass(LandscapeDto),
  asClass(PortraitDto),
  asClass(UnderWaterDto),
]);
```

</details>

### `asNullable`

The value may be `null`.

<details>
<summary>Usage</summary>

**Only** `null`:

```ts
const transformer = asNullable(asNever());
```

String or `null`:

```ts
const transformer = asNullable(asString());
```

</details>

### `asClass`

Transforms the fields of the passed [class][class] that have the
[`@transform`](#transform) [decorator][decorators].

<details>
<summary>Usage</summary>

Empty class

```ts
class Foo {}

const transformer = asClass(Foo);
```

</details>

#### `@transform`

The decorator adds the passed transformer to the metadata which is later used by
the [`asClass`](#asclass) transformer.

<details>
<summary>Usage</summary>

```ts
import {asClass} from './as-class.js';

class UserDto {
  @transform(asString())
  public readonly nickname: string;

  public constructor(nickname: UserDto['nickname']) {
    this.nickname = nickname;
  }
}

const transformer = asClass(UserDto);
```

</details>

### `asEnumFloat64`

Transformation of [numeric enum][numeric-enum].

<details>
<summary>Usage</summary>

```ts
enum Direction {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
}

const transformer = asEnumFloat64(UserDto);
```

</details>

### `asEnumString`

Transformation of [string enum][string-enum].

<details>
<summary>Usage</summary>

```ts
enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

const transformer = asEnumString(UserDto);
```

</details>

### `asUuidString`

Transformation of [UUID][uuid] string.

<details>
<summary>Usage</summary>

```ts
type UserId = UuidString & {readonly __userId: unique symbol};

const transformer = asUuidString<UserId>();
```

</details>

[array]: https://mdn.io/array
[bigint]: https://mdn.io/bigint
[set]: https://mdn.io/set
[map]: https://mdn.io/map
[boolean]: https://mdn.io/boolean
[number]: https://mdn.io/number
[string]: https://mdn.io/string
[date]: https://mdn.io/date
[regexp]: https://mdn.io/regexp
[class]:
  https://www.typescriptlang.org/docs/handbook/2/classes.html#handbook-content
[decorators]:
  https://www.typescriptlang.org/docs/handbook/decorators.html#decorators
[numeric-enum]:
  https://www.typescriptlang.org/docs/handbook/enums.html#numeric-enums
[string-enum]:
  https://www.typescriptlang.org/docs/handbook/enums.html#string-enums
[uuid]: https://datatracker.ietf.org/doc/html/rfc4122
[value-transformer]: ./src/base/value-transformer.ts
