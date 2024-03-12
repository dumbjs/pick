import { get } from './get'

export function normalizePath(source: Record<string, unknown>, key: string) {
  const normalized = []
  let split = key.split('.')
  const hasArraySplit = split.findIndex(x => x === '[]')
  if (hasArraySplit > -1) {
    const usableSplit = split.slice(0, hasArraySplit)
    const remainingSplit = split.slice(hasArraySplit + 1)
    const item = get(source, usableSplit.join('.'))
    if (!Array.isArray(item)) {
      // FIXME: throw an error
      return normalized
    }

    let existingPaths = usableSplit.slice()
    const normalizedPaths = item.map((arrItem, index) => {
      return existingPaths
        .concat(String('[' + index + ']'))
        .concat(remainingSplit)
    })

    return normalized.concat(normalizedPaths.map(x => x.join('.')))
  }

  return normalized.concat(split.join('.'))
}
