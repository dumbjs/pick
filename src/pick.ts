import { get } from './get'
import { normalizePath } from './paths'
import { set } from './set'

export function pick(source: Record<string, unknown>, keys: string[]) {
  const normalizedKeys = keys.map(d => normalizePath(source, d)).flat(1)
  const target = {}

  normalizedKeys.forEach(k => {
    const value = get(source, k)
    set(target, k, value)
  })

  return target
}
