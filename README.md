# VpTypes

[![npm](https://img.shields.io/npm/v/vptypes)](https://www.npmjs.com/package/vptypes)
![vue](https://img.shields.io/badge/vue-3.0.0-green)
![types](https://img.shields.io/badge/types-typescript-blue)
[![GitHub license](https://img.shields.io/github/license/JasKang/vptypes)](https://github.com/JasKang/vptypes/blob/main/LICENSE)

Prop type definitions for Vue.js. Compatible with both Vue 3.0

## Installation

```shell
yarn add vptypes
```

```ts
import VpTypes from 'vptypes'
```

## Example

```ts
props: {
  separator: VpTypes.string()
}

///////////////[ type ]///////////////////
props: Readonly<{
    separator?: string | undefined;
}>
```

## def

```ts
props: {
  separator: VpTypes.string().def('/'),
},

///////////////[ type ]///////////////////
props: Readonly<{
    separator: string;
}>
```

## isRequired

```ts
props: {
  separator: VpTypes.string().isRequired,
},

///////////////[ type ]///////////////////
props: Readonly<{
    separator: string;
}>
```

## screenshots:

### def params type check:

<kbd>
<img src="https://user-images.githubusercontent.com/5652594/106007054-d9f40e80-60f0-11eb-8dda-aeb06174c313.png" />
</kbd>

### props type check:

<kbd>
<img src="https://user-images.githubusercontent.com/5652594/106007064-db253b80-60f0-11eb-8ca5-f8ea1836bcd3.png" />
</kbd>

## Support types:

- VpTypes.string<T extends string = string>()

- VpTypes.number()

- VpTypes.bool()

- VpTypes.symbol()

- VpTypes.object<T extends any = Record<string, unknown>>()

- VpTypes.array<T extends any[]>()

- VpTypes.func<T extends (...args: any) => any>()

- VpTypes.integer()

- VpTypes.hexColor()

  ```ts
  props: {
    textColor: VpTypes.hexColor().def('#303133'),
  }

  ///////////////[ type ]///////////////////
  props: Readonly<{
    textColor: `#${string}`;
  }
  ```

- VpTypes.oneOfString<T extends string[]>(list: T)

  ```ts
  props: {
    type: VpTypes.oneOfString(['success', 'warning', 'info', 'error']).def('info'),
  }

  ///////////////[ type ]///////////////////
  props: Readonly<{
    type: "success" | "warning" | "info" | "error";
  }
  ```

- VpTypes.oneOfType<T extends Array<VPropOptions<any>>(list: T)

  ```ts
  props: {
    value: VpTypes.oneOfType([VpTypes.string(), VpTypes.number()]).isRequired,
  }

  ///////////////[ type ]///////////////////
  props: Readonly<{
      value: string | number;
  }
  ```

- VpTypes.any()
