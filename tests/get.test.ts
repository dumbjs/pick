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
  }
  assert.equal(get(source, 'a.b.[0].c'), 1)
})

test.run()
