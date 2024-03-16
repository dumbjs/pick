# pick

> Straightforward object picker and walkers

### Why?

I have re-written this utility at least 3 times now and each time I end up with
something where either an array or an object is a after thought. A lot of times
it's okay to use the Array methods with the picker but if I can simplify the
most common case of picking from an array inside the object then, I might as
well do this.

### Usage

```sh
; npm add @dumbjs/pick
```

```js
import { pick } from '@dumbjs/pick'
import { get } from '@dumbjs/pick/get'
import { set } from '@dumbjs/pick/set'
```

### Examples

- [`pick`](/tests/pick.test.ts)
- [`get`](/tests/get.test.ts)
- [`set`](/tests/set.test.ts)
