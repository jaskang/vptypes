# VpTypes

### Basic usage

```ts
props: {
  separator: VpTypes.string()
}

///////////////[ type ]///////////////////
props: Readonly<{
    separator?: string | undefined;
}>
```

### def

```ts
props: {
  separator: VpTypes.string().def('/'),
},

///////////////[ type ]///////////////////
props: Readonly<{
    separator: string;
}>
```

### isRequired

```ts
props: {
  separator: VpTypes.string().isRequired,
},

///////////////[ type ]///////////////////
props: Readonly<{
    separator: string;
}>
```

### Support type:

#### VpTypes.string<T extends string = string>()

#### VpTypes.number()

#### VpTypes.bool()

#### VpTypes.symbol()

#### VpTypes.object<T extends any = Record<string, unknown>>()

#### VpTypes.array<T extends any[]>()

#### VpTypes.func<T extends (...args: any) => any>()

#### VpTypes.integer()

#### VpTypes.hexColor()

```ts
props: {
  textColor: VpTypes.hexColor().def('#303133'),
}

///////////////[ type ]///////////////////
props: Readonly<{
  textColor: `#${string}`;
}
```

#### VpTypes.oneOfString<T extends readonly string[]>(list: T)

```ts
props: {
  type: VpTypes.oneOfString(['success', 'warning', 'info', 'error'] as const).def('info'),
}

///////////////[ type ]///////////////////
props: Readonly<{
  type: "success" | "warning" | "info" | "error";
}
```

#### VpTypes.oneOfType<T extends readonly VpProp<unknown>[]>(list: T)

```ts
props: {
  value: VpTypes.oneOfType([VpTypes.string(), VpTypes.number()]).isRequired,
}

///////////////[ type ]///////////////////
props: Readonly<{
    value: string | number;
}
```

#### VpTypes.any()
