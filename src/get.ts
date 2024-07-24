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
  if (obj === null || obj === undefined) {
    return undefined
  }

  if (typeof obj != 'object') {
    throw new Error('get only works with objects and instances of objects')
  }

  if (Object.hasOwn(obj, path)) {
    return obj[path]
  }

  const pathSplits = getSplits(path)

  let point: Value = obj as Value
  for (let d of pathSplits) {
    if (point === undefined || point === null) {
      return defaultValue
    }
    if (d.startsWith('[') && d.endsWith(']')) {
      const index = d.replace(/\[(\d+)?\]/, '$1')
      if (typeof point === 'object' && index in point) {
        point = point[index]
      }
    } else {
      point = point[d]
    }
  }
  return (point === 'undefined' || point === 'null') && defaultValue
    ? defaultValue
    : point
}

function getSplits(path: string) {
  const pathSplits = []
  let lastSlice = 0
  path.replace(/(\.)(\.)?/g, (...matches) => {
    if (matches[0] === '.') {
      pathSplits.push(path.slice(lastSlice, matches[3]).replace('..', '.'))
      lastSlice = matches[3] + 1
    }
    return ''
  })
  pathSplits.push(path.slice(lastSlice))
  return pathSplits
}
