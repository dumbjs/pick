/**
 * @param obj
 * @param {string} path
 * @returns
 */
export function get<T>(obj: T, path: string) {
  if (typeof obj != 'object')
    throw new Error('get only works with objects and instances of objects')

  let point = obj
  path.split('.').forEach(d => {
    if (d.startsWith('[') && d.endsWith(']')) {
      const index = d.replace(/\[(\d+)\]/, '$1')
      point = point[index]
    } else {
      point = point[d]
    }
  })
  return point
}
