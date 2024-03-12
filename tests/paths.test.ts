import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { normalizePath } from '../src/paths'

test('non array path', () => {
  const object = { a: 1 }
  const normalized = normalizePath(object, 'a')
  const paths = normalized?.flat(1)
  assert.equal(paths[0], 'a')
})

test('non array deep path', () => {
  const object = { a: { b: { c: { d: 1 } } } }
  const normalized = normalizePath(object, 'a.b.c.d')
  const paths = normalized?.flat(1)
  assert.equal(paths[0], 'a.b.c.d')
})

test('array short path', () => {
  const object = { a: { b: [1] } }
  const normalized = normalizePath(object, 'a.b.[]')
  const paths = normalized?.flat(1)
  assert.equal(paths, ['a.b.[0]'])
})

test('array long paths', () => {
  const object = { a: { b: [{ c: 1 }, { c: 2 }] } }
  const normalized = normalizePath(object, 'a.b.[].c')
  const paths = normalized?.flat(1)
  assert.equal(paths, ['a.b.[0].c', 'a.b.[1].c'])
})

test.run()
