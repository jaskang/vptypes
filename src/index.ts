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

type TYPESKEYS = keyof typeof TYPES

type VPropOptions<T = any, D extends boolean = false, R extends boolean = false> = {
  typeName: TYPESKEYS
  typeChecker: T
  type?: PropType<T>
  validator?(value: unknown): boolean
  def: (value: ((props: any) => T) | T) => VPropOptions<T, true, R>
  readonly isRequired: VPropOptions<T, D, true>
} & (D extends true
  ? {
      default: T
    }
  : {}) &
  (R extends true
    ? {
        required: R
      }
    : {})

type validatorType = (value: unknown) => boolean

type HexColorType = `#${string}`

function createType<T>(type: TYPESKEYS | TYPESKEYS[], validator?: validatorType) {
  return {
    typeName: type,
    typeChecker: (null as unknown) as T,
    type: Array.isArray(type)
      ? type.map(i => {
          return TYPES[i]
        })
      : TYPES[type],
    validator: validator,
    def(value) {
      this.default = value
      return this
    },
    get isRequired() {
      this.required = true
      return this
    }
  } as VPropOptions<T>
}

// type ElementOf<T> = T extends Array<infer E> ? E : never

export class VpTypes {
  static any() {
    const prop = createType<any>('any')
    return prop
  }
  static string<T extends string = string>() {
    const prop = createType<T>('string')
    return prop
  }
  static number() {
    const prop = createType<number>('number')
    return prop
  }
  static bool() {
    const prop = createType<boolean>('boolean').isRequired
    return prop
  }
  static symbol() {
    const prop = createType<symbol>('symbol')
    return prop
  }
  static object<T = Record<string, any>>() {
    const prop = createType<T>('object')
    return prop
  }
  static array<T extends any[]>() {
    const prop = createType<T>('array')
    return prop
  }
  static func<T extends (...args: any) => any>() {
    const prop = createType<T>('function')
    return prop
  }
  static integer() {
    const prop = createType<number>('number', (value: unknown) => {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value
    })
    return prop
  }
  static hexColor() {
    const prop = createType<HexColorType>('string', (value: unknown) => {
      if (typeof value === 'string') {
        return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value)
      }
      return false
    })
    return prop
  }
  static oneOfString<T extends V[], V extends string>(list: T) {
    const prop = createType<T[number]>('string', (value: unknown) => {
      return list.indexOf(value as V) !== -1
    })
    return prop
  }
  static oneOfType<T extends V[], V extends VPropOptions<any>>(list: T) {
    const types = list.map(prop => {
      return prop.typeName
    })
    const validators = list
      .map(prop => {
        return prop.validator
      })
      .filter(Boolean) as validatorType[]
    const prop = createType<T[number]['typeChecker']>(
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

export default VpTypes
