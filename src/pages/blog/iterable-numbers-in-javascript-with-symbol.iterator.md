---
title: Iterable Numbers in JavaScript with Symbol.iterator
date: 2018-06-05T14:24:24.746Z
description: Just an experiment to iterate numbers with for-of loop and spread to create ranges etc.
tags: ["JavaScript","ES6"]
templateKey: blog-post
---

> Kudos to [Samantha Ming](http://www.samanthaming.com/tidbits/17-print-ranges-natively)
> for her thoughts on printing ranges natively on JavaScript.

This looked really promising and cool. So I though about
implementing within a custom class and without generators
so it can run without [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) in Nodejs.

This is what I came up with and it doesn't have any side
effects mentioned by the original article.

The purpose of the class is to create a number that can
be spread into an array reaching to 0 from either positive
or negative side.

Since the implementation basically uses `Symbol.iterator`
it also works for looping with `for ...of`.

This is what the code looks like.

```js
/**
 * An experimental iterable number class
 *
 * It implements Symbol.iterator, so one can use it with for-of loop and spread.
 *
 * This is just an experiment, I don't know why someone would actually use it,
 * but if you are and need some sort of license, here you go.
 *
 * copyright 2018 Swashata Ghosh <swashata@wpquark.com>
 * This code is licensed under MIT license
 */
class IterableNumber {
	constructor(num = 0) {
		if (Number.isNaN(Number.parseInt(num, 10)) || !Number.isFinite(num)) {
			throw new Error('Must pass a valid finite integer');
		}
		this.num = num;
		this[Symbol.iterator] = () => ({
			next: this.generateNext(this.num),
		});
	}

	generateNext = top => {
		// increase the number by one, if positive, else decrease by one
		let running = top > 0 ? top + 1 : top - 1;
		return () => {
			// If the running number is zero, then it was done
			// in the previous step
			if (running === 0) {
				return {
					done: true,
				};
			}
			// Otherwise, let's decrease or increase the number, based on
			// positivity
			running = this.num > 0 ? running - 1 : running + 1;
			return {
				value: running,
				done: false,
			};
		};
	};
}
```

Now we can use it like this.

```js
const spreadedNum = [...new IterableNumber(9)];
console.log(spreadedNum); // [ 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]

for (const i of new IterableNumber(20)) {
	console.log(i); // 20, 19, 18, ... 1, 0
}

const spreadedNumN = [...new IterableNumber(-9)];
console.log(spreadedNumN); // [ -9, -8, -7, -6, ..., -2, -1, 0 ]

const spreadedZ = [...new IterableNumber(0)];
console.log(spreadedZ); // [ 0 ]

try {
	const invalidSpread = [...new IterableNumber('duh?')];
	console.log(invalidSpread);
} catch (e) {
	console.log(e); // [Error: Must pass a valid finite integer]
}
```

If you have any questions, shoot.
