/**
 * `set` module provides a simple object
 * walker to set the value of deeply nested inside
 * the object, this modifies the original object
 * so use it carefully
 *
 * @module
 */

/**
 * `set` module provides a simple object
 * walker to set the value of deeply nested inside
 * the object, this modifies the original object
 * so use it carefully
 * ```js
 * const obj = {a:1}
 * set(obj,"b",10)
 * get(obj,"b") //=> 10
 * set(obj,"b.a",3)
 * get(obj,"b") //=> {a:3}
 * get(obj,"b.a") //=> 3
 * ```
 * @param obj
 * @param {string} path
 * @param {unknown} value
 */
export function set<T extends object>(obj: T, path: string, value: unknown) {
  if (typeof obj != 'object') {
    throw new Error('set only works with objects and instances of objects')
  }
  let point: unknown = obj
  let parent: unknown = obj

  path.split('.').forEach((pathPart, index, src) => {
    const isLastFrag = index === src.length - 1
    const lastKey = src[index - 1]
    const nextKey = src[index + 1]
    let keyInObj = pathPart
    let isArray = false

    if (nextKey && nextKey.startsWith('[') && nextKey.endsWith(']')) {
      isArray = true
    }

    if (pathPart.startsWith('[') && pathPart.endsWith(']')) {
      const matcher = pathPart.match(/\[(\d+)\]/)
      keyInObj = matcher[1]
    }

    if (typeof point != 'object') {
      parent[lastKey] = {}
      point = parent[lastKey]
    } else {
      if (!(keyInObj in point)) {
        if (isArray) {
          point[keyInObj] = []
        } else {
          point[keyInObj] = {}
        }
      }
    }

    if (isLastFrag) {
      point[keyInObj] = value
    } else {
      parent = point
      point = point[keyInObj]
    }
  })
}
