---
templateKey: blog-post
featured_image: null
hero_image: ''
title: "React Repeater HOC"
date: 2018-04-19T10:17:33+05:30
draft: false
tags: ["React", "javascript", "hoc"]
---

This came out as a discussion with people from [wesbos](https://wesbos.com) slack channel.

> PS: Do buy his courses, those are just awesome 🔥

The issue at hand was to functionally repeat a react component N times. So I came
up with this quick HOC.

```jsx
import React from 'react';

/**
 * A HOC to repeat a component N times.
 *
 * @param {React.Component} Component The original component
 * @param {Number} times How many times it has to be repeated
 * @param {String} keyPrefix The prefix for the key and index
 */
const Repeater = (Component, times = 1, keyPrefix = 'rp') => props => {
	const Repeated = [];
	Repeated.length = times;
	Repeated.fill(Component);
	return (
		<div className="repeater">
			{Repeated.map((Com, index) => (
				<Com
					{...props}
					key={`${keyPrefix}-${index}`}
					index={`${keyPrefix}-${index}`}
					num={index}
				/>
			))}
		</div>
	);
};

export default Repeater;
```

It accepts three parameters, the `Component`, how many `times` and a `keyPrefix` to
dynamically create a Key (*Maybe this is a bad idea, but if you have something better
let me know*).

Use it like this.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

import Repeater from './Repeater';

const Foo = props => (
	<div className="wpq-eform-foo">
		<h2 className="wpq-eform-foo__title">Hello World {props.num}</h2>
		<p className="wpq-eform-foo__description">I am number {props.num}</p>
		<div className="wpq-eform-foo__cool">
			{props.cool ? 'I am cool' : 'I am not cool'}
		</div>
	</div>
);
Foo.propTypes = {
	cool: PropTypes.bool.isRequired,
};

const RepeatStuff = props => {
	const RepeatedFoo = Repeater(Foo, props.times, props.keyPrefix);
	return (
		<div className="repeated-item">
			<RepeatedFoo cool />
		</div>
	)
};

RepeatStuff.propTypes = {
	times: PropTypes.number.isRequired,
	keyPrefix: PropTypes.string.isRequired,
};


export default RepeatStuff;
```

Hope it helps.
