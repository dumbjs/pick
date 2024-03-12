import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { set } from '../src/set'

test('set empty path', () => {
  const source = {}
  set(source, 'a', 2)
  assert.equal(source['a'], 2)
})

test('set short path', () => {
  const source = { a: 1 }
  set(source, 'a', 2)
  assert.equal(source.a, 2)
})

test('set long path', () => {
  const source = {
    a: {
      b: {
        c: {
          d: { e: 1 },
        },
      },
    },
  }
  set(source, 'a.b.c.d', 2)
  assert.equal(source.a.b.c.d, 2)
})

test('set existing array paths', () => {
  const source = {
    a: {
      b: [{ c: 1 }],
    },
  }
  set(source, 'a.b.0.c', 2)
  assert.equal(source.a.b[0].c, 2)
})

test('set new array paths', () => {
  const source = {
    a: {
      b: [{ c: 1 }],
    },
  }
  set(source, 'a.c.[1].d', 3)
  assert.equal(source.a['c'][1].d, 3)
})

test.run()
