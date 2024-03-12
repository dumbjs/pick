/**
 * @param obj
 * @param {string} path
 * @param {unknown} value
 */
export function set<T extends object>(obj: T, path: string, value: unknown) {
  if (typeof obj != 'object')
    throw new Error('set only works with objects and instances of objects')
  let point: unknown = obj

  path.split('.').forEach((d, index, src) => {
    const isLastFrag = index === src.length - 1
    const nextKey = src[index + 1]
    let keyInObj = d
    let isArray = false

    if (nextKey && nextKey.startsWith('[') && nextKey.endsWith(']')) {
      isArray = true
    }

    if (d.startsWith('[') && d.endsWith(']')) {
      const matcher = d.match(/\[(\d+)\]/)
      keyInObj = matcher[1]
    }

    if (!(keyInObj in (point as object))) {
      if (isArray) {
        point[keyInObj] = []
      } else {
        point[keyInObj] = {}
      }
    }

    if (isLastFrag) {
      point[keyInObj] = value
    } else {
      point = point[keyInObj]
    }
  })
}
