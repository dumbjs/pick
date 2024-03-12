import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { pick } from '../src/pick'

test('single prop', () => {
  const result = pick({ a: 1, b: 2 }, ['a'])
  assert.equal(result, { a: 1 })
})

test('multi prop', () => {
  const result = pick({ a: 1, b: 2 }, ['a', 'b'])
  assert.equal(result, { a: 1, b: 2 })
})

test('nested props', async () => {
  const result = pick({ a: 1, b: { c: 2, d: 1 } }, ['a', 'b.c'])
  assert.equal(result, { a: 1, b: { c: 2 } })
})

test('nested array props', async () => {
  const result = pick({ a: 1, b: { c: [{ d: 1 }, { d: 2 }], e: { d: 1 } } }, [
    'a',
    'b.c.[].d',
  ])
  assert.equal(result, { a: 1, b: { c: [{ d: 1 }, { d: 2 }] } })
})

test.run()
