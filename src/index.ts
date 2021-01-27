import { PropType } from 'vue'

export const TYPES = {
  string: String,
  number: Number,
  boolean: Boolean,
  symbol: Symbol,
  date: Date,
  array: Array,
  object: Object,
  function: Function,
}

export interface PropOptions<T = any, D = T> {
  type?: PropType<T> | true | null
  required?: boolean
  default?: D | ((props: Record<string, unknown>) => D | null | undefined) | null | undefined | Record<string, unknown>
  validator?(value: unknown): boolean
}

type validatorType = (value: unknown) => boolean

type HexColorType = `#${string}`

// type AugmentedRequired<T extends any, K extends keyof T = keyof T> = Omit<T, K> & Required<Pick<T, K>>
type VpProp<P, D = false, R = false> = {
  _meta_: P
  type?: PropType<P>
  validator?: validatorType
  required: R extends true ? true : false
  def(value: P): VpProp<P, true, R>
  readonly isRequired: VpProp<P, D, true>
} & (D extends true
  ? {
      default: P
    }
  : {})

function createType<P, D = false, R = false>(type?: unknown, validator?: validatorType): VpProp<P, false, R> {
  return {
    _meta_: type as P,
    type: type as PropType<P>,
    validator: validator,
    required: false as R extends true ? true : false,
    def(value: P) {
      this.deafult = value
      return this as VpProp<P, true, R>
    },
    get isRequired() {
      this.required = true
      return this as VpProp<P, D, true>
    },
  }
}

export const VpTypes = {
  any() {
    const prop = createType<any>()
    return prop
  },
  string<T extends string = string>() {
    const prop = createType<T>(String)
    return prop
  },
  number() {
    const prop = createType<number>(Number)
    return prop
  },
  bool() {
    const prop = createType<boolean>(Boolean).isRequired
    return prop
  },
  symbol() {
    const prop = createType(Symbol)
    return prop
  },
  object<T extends any = Record<string, unknown>>() {
    const prop = createType<T>(Object)
    return prop
  },
  array<T extends any[]>() {
    const prop = createType<T>(Array)
    return prop
  },
  func<T extends (...args: any) => any>() {
    const prop = createType<T>(Function)
    return prop
  },
  integer() {
    const prop = createType<number>(Number, (value: unknown) => {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value
    })
    return prop
  },
  hexColor() {
    const prop = createType<HexColorType>(String, (value: unknown) => {
      if (typeof value === 'string') {
        return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value)
      }
      return false
    })
    return prop
  },
  oneOfString<T extends readonly string[]>(list: T) {
    const prop = createType<T[number]>(String, (value: unknown) => {
      return list.indexOf(value as string) !== -1
    })
    return prop
  },
  oneOfType<T extends readonly VpProp<unknown>[]>(list: T) {
    const types = list.map((prop) => {
      return prop.type
    })
    const validators = list
      .map((prop) => {
        return prop.validator
      })
      .filter(Boolean) as validatorType[]
    const prop = createType<T[number]['_meta_']>(
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
  },
}

export default VpTypes
