/**
 * `pick` is a simple object walker that can be used
 * to create a cloned object using paths that you require
 * instead of cloning everything
 *
 * This is done by traversing the original object
 * and then getting those values planted in the resulting object
 *
 *
 * @module
 */
import { get } from './get'
import { normalizePath } from './paths'
import { set } from './set'

/**
 * Create another object containing only the given paths
 *
 * **Simple Object Prop picking**
 * ```js
 * import { pick } from '@dumbjs/pick'
 *
 * bar: {
 *     const foo = {
 *     foobar: 1,
 *     foobar2: 2,
 *   },
 * }
 * pick(foo, ['foo.bar.foobar'])
 * // => {
 *
 * //       bar: {
 * //        foobar: 1,
 * //      },
 * // }
 * ```
 * **Array in Object pick**
 *
 * ```js
 * import { pick } from '@dumbjs/pick'
 *
 * const foo = { bar: [{ foobar: 1 }] }
 * pick(foo, ['bar.[0].foobar'])
 * ```
 * **Multiple Objects in Array in Object**
 *
 * ```js
 * import { pick } from '@dumbjs/pick'
 *
 * const foo = { bar: [{ foobar: 1 }, { foobar: 2 }] }
 * pick(foo, ['bar.[].foobar'])
 * ```
 * **Simple Object Prop picking**
 *
 * ```js
 * import { pick } from '@dumbjs/pick'
 *
 * const foo = {
 * bar: {
 *
 *     foobar: 1,
 *     foobar2: 2,
 *   },
 * }
 * pick(foo, ['foo.bar.foobar'])
 * // => {
 *
 * //       bar: {
 * //        foobar: 1,
 * //      },
 * // }
 * ```
 * **Array in Object pick**
 *
 * ```js
 * import { pick } from '@dumbjs/pick'
 *
 * const foo = { bar: [{ foobar: 1 }] }
 * pick(foo, ['bar.[0].foobar'])
 * ```
 * **Multiple Objects in Array in Object**
 *
 * ```js
 * import { pick } from '@dumbjs/pick'
 *
 * const foo = { bar: [{ foobar: 1 }, { foobar: 2 }] }
 * pick(foo, ['bar.[].foobar'])
 * ```
 */
export function pick<Source extends Record<string, unknown>>(
  source: Source,
  keys: string[]
): Partial<Source> {
  const normalizedKeys = keys.map(d => normalizePath(source, d)).flat(1)
  const target = {}

  normalizedKeys.forEach(k => {
    const value = get(source, k)
    set(target, k, value)
  })

  return target
}
