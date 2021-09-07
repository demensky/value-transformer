# value-transformer WIP

```ts
class UserDto {
  @field(asString()) public readonly nickname: string;

  @field(asNullable(asString())) public readonly name: string | null;

  public constructor(nickname: UserDto['nickname'], name: UserDto['name']) {
    this.nickname = nickname;

    this.name = name;
  }
}
```
