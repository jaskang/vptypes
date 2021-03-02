import { expectType } from 'tsd'
import { defineComponent } from 'vue'
import { VpTypes } from '../src'

// any()
// string<T extends string = string>()
// number()
// bool()
// symbol()
// object<T extends Record<string, unknown>>()
// array<T extends any[]>()
// func<T extends (...args: any) => any>()
// integer()
// hexColor()
// oneOfString<T extends readonly string[]>(list: T)
// oneOfType<T extends Array<VPropOptions<any>>>(list: T)
interface TypeA {
  a: string
  b: string
}

defineComponent({
  props: {
    string: VpTypes.string(),
    stringDef: VpTypes.string().def('/'),
    stringRequired: VpTypes.string().isRequired,

    number: VpTypes.number(),
    numberDef: VpTypes.number().def(1),
    numberRequired: VpTypes.number().isRequired,

    bool: VpTypes.bool(),
    boolDef: VpTypes.bool().def(true),
    boolRequired: VpTypes.bool().isRequired,

    symbol: VpTypes.symbol(),
    symbolDef: VpTypes.symbol().def(Symbol(0)),
    symbolRequired: VpTypes.symbol().isRequired,

    object: VpTypes.object(),
    objectDef: VpTypes.object().def({}),
    objectRequired: VpTypes.object().isRequired,

    objectT: VpTypes.object<TypeA>(),
    objectTDef: VpTypes.object<TypeA>().def({
      a: 'a',
      b: 'b'
    }),
    objectTRequired: VpTypes.object<TypeA>().isRequired,

    array: VpTypes.array<number[]>(),
    arrayDef: VpTypes.array<number[]>().def([1]),
    arrayRequired: VpTypes.array<number[]>().isRequired,

    func: VpTypes.func<() => boolean>(),
    funcDef: VpTypes.func<() => boolean>().def(() => true),
    funcRequired: VpTypes.func<() => boolean>().isRequired,

    integer: VpTypes.integer(),
    integerDef: VpTypes.integer().def(1),
    integerRequired: VpTypes.integer().isRequired,

    hexColor: VpTypes.hexColor(),
    hexColorDef: VpTypes.hexColor().def('#ffffff'),
    hexColorRequired: VpTypes.hexColor().isRequired,

    oneOfString: VpTypes.oneOfString(['a', 'b']),
    oneOfStringDef: VpTypes.oneOfString(['a', 'b']).def('a'),
    oneOfStringRequired: VpTypes.oneOfString(['a', 'b']).isRequired,

    oneOfType: VpTypes.oneOfType([VpTypes.string(), VpTypes.number()]),
    oneOfTypeDef: VpTypes.oneOfType([VpTypes.string(), VpTypes.number()]).def('sdf'),
    oneOfTypeRequired: VpTypes.oneOfType([VpTypes.string(), VpTypes.number()]).isRequired
  },
  setup(props) {
    expectType<string | undefined>(props.string)
    expectType<string>(props.stringDef)
    expectType<string>(props.stringRequired)

    expectType<number | undefined>(props.number)
    expectType<number>(props.numberDef)
    expectType<number>(props.numberRequired)

    expectType<boolean>(props.bool)
    expectType<boolean>(props.boolDef)
    expectType<boolean>(props.boolRequired)

    expectType<symbol | undefined>(props.symbol)
    expectType<symbol>(props.symbolDef)
    expectType<symbol>(props.symbolRequired)

    expectType<Record<string, any> | undefined>(props.object)
    expectType<Record<string, any>>(props.objectDef)
    expectType<Record<string, any>>(props.objectRequired)

    expectType<TypeA | undefined>(props.objectT)
    expectType<TypeA>(props.objectTDef)
    expectType<TypeA>(props.objectTRequired)

    expectType<number[] | undefined>(props.array)
    expectType<number[]>(props.arrayDef)
    expectType<number[]>(props.arrayRequired)

    expectType<(() => boolean) | undefined>(props.func)
    expectType<() => boolean>(props.funcDef)
    expectType<() => boolean>(props.funcRequired)

    expectType<number | undefined>(props.integer)
    expectType<number>(props.integerDef)
    expectType<number>(props.integerRequired)

    expectType<`#${string}` | undefined>(props.hexColor)
    expectType<`#${string}`>(props.hexColorDef)
    expectType<`#${string}`>(props.hexColorRequired)

    expectType<'a' | 'b' | undefined>(props.oneOfString)
    expectType<'a' | 'b'>(props.oneOfStringDef)
    expectType<'a' | 'b'>(props.oneOfStringRequired)

    expectType<string | number | undefined>(props.oneOfType)
    expectType<string | number>(props.oneOfTypeDef)
    expectType<string | number>(props.oneOfTypeRequired)
  }
})

// const a = ['a', 'b']

// const b = <T extends V[], V extends string>(arr: T) => {
//   return arr[0] as T[number]
// }
// const c = b(['a', 'b'])
