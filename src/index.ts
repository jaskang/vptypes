import { PropType } from 'vue'

const TYPES = {
  string: String,
  number: Number,
  boolean: Boolean,
  symbol: Symbol,
  date: Date,
  array: Array,
  object: Object,
  function: Function,
  any: null
} as const

export type TypeKey = keyof typeof TYPES

export type validatorType = (value: unknown) => boolean

export class Prop<T, D extends boolean, R extends boolean> {
  typeName: TypeKey | TypeKey[]
  typeChecker: T
  default?: T
  type?: PropType<T>
  validator?: validatorType
  required: D extends true ? true : false
  constructor(type: TypeKey | TypeKey[], validator?: (value: unknown) => boolean) {
    this.typeName = type
    this.type = ((Array.isArray(type)
      ? type.map(i => {
          return TYPES[i]
        })
      : TYPES[type]) as unknown) as PropType<T>
    this.validator = validator
  }
  def(value: T) {
    // @ts-ignore
    this.default = value
    return (this as unknown) as Prop<T, true, R>
  }
  get isRequired() {
    // @ts-ignore
    this.required = true
    return (this as unknown) as Prop<T, true, true>
  }
}

const vptypes = {
  any() {
    const prop = new Prop<any, false, false>('any')
    return prop
  },
  string<T extends string>() {
    const prop = new Prop<T, false, false>('string')
    return prop
  },
  oneOfString<T extends V[], V extends string>(list: T) {
    const prop = new Prop<T[number], false, false>('string', (value: unknown) => {
      return list.indexOf(value as V) !== -1
    })
    return prop
  },
  number() {
    const prop = new Prop<number, false, false>('number')
    return prop
  },
  integer() {
    const prop = new Prop<number, false, false>('number', (value: unknown) => {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value
    })
    return prop
  },
  bool() {
    const prop = new Prop<boolean, false, false>('boolean').isRequired
    return prop
  },
  symbol() {
    const prop = new Prop<symbol, false, false>('symbol')
    return prop
  },
  object<T = object>() {
    const prop = new Prop<T, false, false>('object')
    return prop
  },
  array<T extends any[]>() {
    const prop = new Prop<T, false, false>('array')
    return prop
  },
  func<T extends (...args: any) => any>() {
    const prop = new Prop<T, false, false>('function')
    return prop
  },

  hexColor() {
    const prop = new Prop<string, false, false>('string', (value: unknown) => {
      if (typeof value === 'string') {
        return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value)
      }
      return false
    })
    return prop
  },

  oneOfType<T extends V[], V extends Prop<any, false, false>>(list: T) {
    const types = list.map(prop => {
      return prop.typeName
    }) as TypeKey[]
    const validators = list
      .map(prop => {
        return prop.validator
      })
      .filter(Boolean) as validatorType[]
    const prop = new Prop<T[number]['typeChecker'], false, false>(
      types,
      validators.length > 0
        ? (value: unknown) => {
            for (const func of validators) {
              if (!func(value)) {
                return false
              }
            }
            return true
          }
        : undefined
    )
    return prop
  }
}

export default vptypes
