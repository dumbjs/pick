/**
 * `get` module provides a simple object
 * walker to get the value deeply nested inside
 * the object without throwing an error.
 *
 * This allows you to either get the nested value
 * or return a default value if a nothing is found
 * @module
 */

/**
 * `get` module provides a simple object
 * walker to get the value deeply nested inside
 * the object without throwing an error.
 *
 * This allows you to either get the nested value
 * or return a default value if a nothing is found
 * 
 * ```
 * const value = get({a:1},"a") //=> 1
 * const value = get({a:1},"b") //=> undefined
 * const value = get({a:1},"b",2) //=> 2
 * ```
 * @param obj
 * @param {string} path
 * @returns
 */
export function get<T, Value extends unknown>(
  obj: T,
  path: string,
  defaultValue?: Value
): Value {
  if (typeof obj != 'object') {
    throw new Error('get only works with objects and instances of objects')
  }

  let point: Value = obj as Value
  for (let d of path.split('.')) {
    if (!point) {
      return defaultValue
    }
    if (d.startsWith('[') && d.endsWith(']')) {
      const index = d.replace(/\[(\d+)\]/, '$1')
      point = point[index]
    } else {
      point = point[d]
    }
  }
  return point == 'undefined' || point == 'null' ? defaultValue : point
}
