# VpTypes

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70" height="20" role="img" aria-label="vue: 3.0.0"><title>vue: 3.0.0</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="70" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="31" height="20" fill="#555"/><rect x="31" width="39" height="20" fill="#97ca00"/><rect width="70" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="165" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="210">vue</text><text x="165" y="140" transform="scale(.1)" fill="#fff" textLength="210">vue</text><text aria-hidden="true" x="495" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="290">3.0.0</text><text x="495" y="140" transform="scale(.1)" fill="#fff" textLength="290">3.0.0</text></g></svg>
[![npm](https://img.shields.io/npm/v/vptypes)](https://www.npmjs.com/package/vptypes)
[![GitHub license](https://img.shields.io/github/license/JasKang/vptypes)](https://github.com/JasKang/vptypes/blob/main/LICENSE)
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="104" height="20" role="img" aria-label="types: typescript"><title>types: typescript</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="104" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="39" height="20" fill="#555"/><rect x="39" width="65" height="20" fill="#007ec6"/><rect width="104" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="205" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="290">types</text><text x="205" y="140" transform="scale(.1)" fill="#fff" textLength="290">types</text><text aria-hidden="true" x="705" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="550">typescript</text><text x="705" y="140" transform="scale(.1)" fill="#fff" textLength="550">typescript</text></g></svg>

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
