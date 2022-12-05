# Eloquent JavaScript

## Chapter 1: Values, Types, and Operators

**Bits** are two-valued numbers, typically 1s and 0s. **Values** are chunks of bits that represent information, and their role is determined by their type, whether it is number, text, functions, and so on.

- **Numbers**: represented/stored with 64 bits. We can represent $2^{64}$ numbers with the 64 bits. This reduces the likelihood of _overflow_, because very large numbers can fit into 64 bits. One bit is reserved for determining the sign, whether positive or negative. Some bits are reserved for decimals. To perform arithmetic, we use the familiar operators `+`, `-`, `*`, `/`, and `()`. There's also `**` for exponents and `%` for modulo (remainder). There's also `Infinity` (results from `1/0`) and `NaN` (not a number), which are considered numbers in JavaScript, but behave in strange ways.

- **Strings**: represents text, and written with their contents in quotes, like `'hello'`, or `"hello"`, or \`hello\`. Certain characters must be represented by a special code, typically prepended with `\`, such as `\n` for a new-line character, or the quotation with `\"`. We can combine two strings using _concatenation_, like so: `"hello" + ",world"` results in the string `"hello,world"`. Finally, with back-tick literals we can perform operations and make new lines, such as \``half of 100 is ${100 / 2}`\`, which is the same as `"half of 100 is 50"`.

- **Boolean**: represents two possibilities, like yes or no, on or off, and most commonly, `true` and `false`. The result of `3>2` is `true` and the result of `-1 < -3` is `false`. We can also compare strings. For example `joe < sergio` is `true` because `j` comes before `s` in the alphabet. Note, however, that uppercase compares smaller than lowercase: `Z>z` is `false`. There's also `!==` to verify two things are not equal, such as `sergio !== Sergio` (a `true` statement), and `===` to verify equality, such as `sergio === sergio` (also `true`).

Many operators are symbol, like `+` and `%`. Other operators are words, like `typeof`. In particular, `typeof` is _unary_ because it involves only one operand. For example, `typeof 42` is a `number` and `typeof "hello"` is a `string`.

- `null` and `undefined`: used to define absence of values; they're values that carry no information. It says they can be used interchangeably, but I don't think that's true.

JavaScript will use _type coercion_ when an operator involves values of different types. In this case, one value is converted to the data type of the other. For example, `8*null` returns `0`, `"5"-1` returns `4`, `"5"+1` returns `"51"`, `"five"*2` returns `NaN`, and `false === 0` returns `true`. However, if we have `null` or `undefined`, then the expression is only true if we have `null` or` undefined` on both sides.

Finally, the logical operators have a _short-circuiting_ behavior.

- For `||`, the value of the operation is the first _truthy_ or the last _falsy_
- For `&&`, the value of the operation is the first _false_ or the last _truthy_.

## Chaper 2

## Chapter 13: JavaScript and the Browser

A _network protocol_ describes a style of communication over a network. For example, the _Hypertext Transfer Protocol (HTTP)_ is used to retrieve named resources, such as chunks of information, web pages, or pictures. It specifies a request should begin similar to

```
GET /index.html HTTP/1.1
```

HTTP treats the network as a streamlike device into which you can put bits and have them arrive at the correct destination in the correct order. To assist with this, we have the _Transmission Control Protocol (TCP)_. One computer must be waiting, or _listening_ at a certain _port_, which has an associated number, and another computer can connect using the correct port number.

Each document on the Web is named by a _Uniform Resource Locator (URL)_ which looks like

```
http://eloquentjavascript.net/13_browser.html
```

The `http://` part is the protocol, the `eloquentjavascript.net` part is the domain name of the server, and `/13_browser.html` is the path.

## Chapter 14
