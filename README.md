# value-transformer

**Warning!** This library is at an early stage of development. The API may
change without backwards compatibility.

Validation, serialization and deserialization using a single entity. Symmetric
serialization and deserialization. No implicit transformers.

Supports: [`string`](#asstring), [`boolean`](#asboolean),
[`number`](#asfloat64number), [`bigint`](#asbigint), [`null`](#asnullable),
[`Date`](#asdate), [`Array`](#asarray), [`Map`](#asmap), [`Set`](#asset),
[`RegExp`](#asregexp), [`never`](#asnever) and [custom classes](#asclass).

## Features of transformers

- Check compatibility with the type.
- Validate a literal for correctness and deserialize it to data.
- Serialize data into a JSON-like literal.
- Serialize data into a compact JSON-like literal.

### `compatibleWith`

This method verifies that data can potentially be serialized by this
transformer. Used by [the `asOneOf` transformer](#asoneof).

### `fromLiteral`

This method attempts to deserialize a JSON-like literal (serialized using
[the `toLiteral` method](#toliteral) or
[the `toCompactLiteral` method](#tocompactliteral)) into data. The literal is
carefully checked for consistency within each transformer.

Throws an `IncompatibleLiteralError` if an incompatible literal is passed.

```ts
const transformer = asMap(asBoolean(), asDate());

const expandedLiteral = [
  [false, '1970-01-01T00:00:00.000Z'],
  [true, '2000-01-01T00:00:00.000Z'],
];

const compactLiteral = [
  [0, 0],
  [1, 946684800000],
];

console.log(transformer.fromLiteral(expandedLiteral));
console.log(transformer.fromLiteral(compactLiteral));
```

```
Map(2) {
  false => 1970-01-01T00:00:00.000Z,
  true => 2000-01-01T00:00:00.000Z
}
```

### `toLiteral`

This method serializes the data to an **expanded** JSON-like literal (to be
passed to [the `fromLiteral` method](#fromliteral)).

```ts
const transformer = asMap(asBoolean(), asDate());

const data = new Map([
  [false, new Date(0)],
  [true, new Date(Date.UTC(2000, 0, 1))],
]);

console.log(transformer.toLiteral(data));
```

```json
[
  [false, "1970-01-01T00:00:00.000Z"],
  [true, "2000-01-01T00:00:00.000Z"]
]
```

### `toCompactLiteral`

This method serializes the data into a **compact** JSON-like literal (to be
passed to [the `fromLiteral` method](#fromliteral)).

Compact mode is only implemented by [`asBoolean`](#asboolean),
[`asClass`](#asclass), [`asDate`](#asdate), [`asOneOf`](#asoneof) and
[`asRegExp`](#asregexp). Others simply return a result equivalent to
[`toLiteral`](#toliteral) and call [`toCompactLiteral`](#tocompactliteral) on
child transformers.

```ts
const transformer = asMap(asBoolean(), asDate());

const data = new Map([
  [false, new Date(0)],
  [true, new Date(Date.UTC(2000, 0, 1))],
]);

console.log(transformer.toCompactLiteral(data));
```

```json
[
  [0, 0],
  [1, 946684800000]
]
```

## Transformers

All transformer classes have an alias function for better usability.

### `asBigInt`

Implements a transfer of any [`bigint`][bigint] value. The literal is stored as
a string of numbers.

### `asBoolean`

Implements a transfer of [`boolean`][boolean] value. In compact mode, `true` is
represented as `1` and `false` is represented as `0`.

### `asFloat64Number`

TODO

### `asString`

TODO

### `asArray`

Implements a transfer of [`Array`][array] instance. **Requires** a child
transformer. **Sparse** arrays are not supported.

An always empty array can be declared like this: `asArray(asNever())`.

### `asDate`

Implements a transfer of [`Date`][date] instance. The literal is stored as an
ISO 8601 string, in the compact mode it is number of milliseconds.
`"Invalid Date"` is also successfully transferred.

### `asMap`

TODO

### `asRegExp`

TODO

### `asSet`

TODO

### `asNullable`

TODO

### `asClass`

Implements a transfer of target class instances.

All fields marked with [the `@field` decorator][field] will be serialized and
deserialized. Field order is important when using
[compact mode](#tocompactliteral). During deserialization, the constructor of
the target class is not called, an instance is created using
[`Object.create`][object-create].

```ts
class UserDto {
  @field(asString()) public readonly nickname: string;

  @field(asNullable(asString())) public readonly name: string | null;

  public constructor(nickname: UserDto['nickname'], name: UserDto['name']) {
    this.nickname = nickname;
    this.name = name;
  }
}

const data = new UserDto('demensky', null);

const transformer = asClass(UserDto);

console.log(transformer.toLiteral(data));
console.log(transformer.toCompactLiteral(data));
```

```json
{"nickname": "demensky", "name": null}
```

```json
["demensky", null]
```

### `asEnum`

TODO

### `asUuidString`

TODO

### `asOneOf`

TODO

### `asNever`

TODO

[array]: https://mdn.io/array
[bigint]: https://mdn.io/bigint
[boolean]: https://mdn.io/boolean
[date]: https://mdn.io/date
[object-create]: https://mdn.io/object.create
[value-transformer]: ./src/base/value-transformer.ts
[field]: ./src/transformer/class/field.ts
