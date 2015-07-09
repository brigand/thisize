# thisize

Converts normal functions to methods. This is mostly useful for the es7 `::` operator which
allows chaining with simple functions.

## Install

It's available on npm. It has no dependencies so you can grab a [wzrd.in][cdn] standalone build. 

```sh
npm install --save thisize@0.1
```

[cdn]: https://wzrd.in/standalone/thisize

## `thisize(fn, thisArgIndex=0)`

Say you have the function `first`:

```js
function first(xs) {
    return xs[0];
}

first('abc') === 'a';
```

You could thisize it which uses the `this` context instead of the first argument.

```js
thisize(first).call('abc') === 'a';
```

You can specify an index relative to the start of the argument list, or the end (if you need this for some reason).

For example:

```js
var readFile = thisize(fs.readFile, -1);

function handleResponse(err, data) { ... };

// the following are equivilent
handleResponse::readFile('foo.txt', 'utf8');
readFile.call(handleResponse, 'foo.txt', 'utf8');
fs.readFile('foo.txt', 'utf8', handleResponse);
```

## Useful examples!

Think about the places we use chaining in JS, for example, jQuery plugins!

```js
function setColor(el, color){
    el.css({color: color});
    return el;
}

export setColor;
export default thisize(setColor);
```

And then it can be used in a functional manner:

```js
import {setColor} from 'jq-set-color';

compose(setColor, somethingElse)($('.foo'));
```

Or with the es7 `::` operator:

```js
import setColor from 'jq-set-color';

$('.foo')
 .show()
 ::setColor('green')
 .text('Cool?')
```

Either way is fine, and not having to pollute $.fn is a win.


