import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { get } from '../src/get'

test('get short path', () => {
  assert.equal(get({ a: 1 }, 'a'), 1)
})

test('get long path', () => {
  const source = {
    a: {
      b: {
        c: {
          d: { e: 1 },
        },
      },
    },
  }
  assert.equal(get(source, 'a.b.c.d'), { e: 1 })
})

test('array paths', () => {
  const source = {
    a: {
      b: [{ c: 1 }],
    },
    b: {
      c: [0, 1],
    },
  }
  assert.equal(get(source, 'a.b.[0].c'), 1)
  assert.equal(get(source, 'b.c.[0]'), 0)
})

test('get key over path', () => {
  const source = {
    'a.b': 1,
    'a': {
      b: [{ c: 1 }],
    },
  }
  assert.equal(get(source, 'a.b'), 1)
})

test('access empty keys', () => {
  const source = { a: { '': 1 } }
  assert.equal(get(source, 'a.[]'), 1)
})

test('handle complex paths', () => {
  const source = {
    a: {
      '1.32': { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: 8 } } } } } },
    },
  }
  assert.equal(get(source, 'a.1..32.["b"].c.[\'d\'].\ne\n.f.g'), 8)
})

test('undefined on nullish object', () => {
  const source = null
  assert.equal(get(source, 'a'), undefined)
})

test('deep path is nullish', () => {
  const source = null
  assert.equal(get(source, 'a.b.c'), undefined)
})

test('return null from path', () => {
  const source = {
    a: {
      b: null,
    },
  }
  assert.equal(get(source, 'a.b'), null)
})

test.run()
