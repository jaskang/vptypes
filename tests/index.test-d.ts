import { expectType } from 'tsd'
import { defineComponent } from 'vue'
import vptypes from '../src'

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
    string: vptypes.string(),
    stringDef: vptypes.string().def('/'),
    stringRequired: vptypes.string().isRequired,

    number: vptypes.number(),
    numberDef: vptypes.number().def(1),
    numberRequired: vptypes.number().isRequired,

    bool: vptypes.bool(),
    boolDef: vptypes.bool().def(true),
    boolRequired: vptypes.bool().isRequired,

    symbol: vptypes.symbol(),
    symbolDef: vptypes.symbol().def(Symbol(0)),
    symbolRequired: vptypes.symbol().isRequired,

    object: vptypes.object(),
    objectDef: vptypes.object().def({}),
    objectRequired: vptypes.object().isRequired,

    objectT: vptypes.object<TypeA>(),
    objectTDef: vptypes.object<TypeA>().def({
      a: 'a',
      b: 'b'
    }),
    objectTRequired: vptypes.object<TypeA>().isRequired,

    array: vptypes.array<number[]>(),
    arrayDef: vptypes.array<number[]>().def([1]),
    arrayRequired: vptypes.array<number[]>().isRequired,

    func: vptypes.func<() => boolean>(),
    funcDef: vptypes.func<() => boolean>().def(() => true),
    funcRequired: vptypes.func<() => boolean>().isRequired,

    integer: vptypes.integer(),
    integerDef: vptypes.integer().def(1),
    integerRequired: vptypes.integer().isRequired,

    hexColor: vptypes.hexColor(),
    hexColorDef: vptypes.hexColor().def('#ffffff'),
    hexColorRequired: vptypes.hexColor().isRequired,

    oneOfString: vptypes.oneOfString(['a', 'b']),
    oneOfStringDef: vptypes.oneOfString(['a', 'b']).def('a'),
    oneOfStringRequired: vptypes.oneOfString(['a', 'b']).isRequired,

    oneOfType: vptypes.oneOfType([vptypes.string(), vptypes.number()]),
    oneOfTypeDef: vptypes.oneOfType([vptypes.string(), vptypes.number()]).def('sdf'),
    oneOfTypeRequired: vptypes.oneOfType([vptypes.string(), vptypes.number()]).isRequired
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
