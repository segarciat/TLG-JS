// The 5 primitives and their corresponding data types.
console.log(42);
console.log(typeof 42); // number

console.log("Hello, World");
console.log(typeof "Hello, World"); // string

console.log(false);
console.log(typeof false); // boolean

console.log(null);
console.log(typeof null); // object

console.log(undefined);
console.log(typeof undefined); // undefined

// Math Operators with numbers
console.log(1 + 2); // addition: 3
console.log(7 - 3); // subtraction: 4
console.log(11 * 0); // multiplication: 0
console.log(2**3); // exponent: 2 to the third power: 8
console.log(20 / 3); // division: floating point division, 6.666666666666667
console.log(50 % 4); // remainder operator, or modulo: 2

// String operations and functions
console.log("hello".length); // 5
console.log("Hello, world".length);
console.log("Hello, world".endsWith("d")); // true
console.log("Hello, world".indexOf("e")); // 1
console.log("Hello, world".split(",")); // ['Hello', ' world']
console.log("Hello, world".startsWith("h")); // false
console.log("Hello, world".startsWith("H")); // true
console.log("Hello, world".substring(5));
console.log("Hello, world".substring(5, 11)); // , worl
console.log("Hello, world".substring(1)); // ello, world
console.log("Hello, world".slice(1)); // ello, world
console.log("Hello, world".slice(5, 11)); // , worl
var secretNumber = 10;
console.log(typeof 10); // number
// var willCauseError = 10.toString();
secretNumber = secretNumber.toString(); // "10" as a string
console.log(typeof secretNumber); // string
secretNumber = 10 + "";
console.log(typeof secretNumber); // string

// Boolean operations
let isDayOfWeek = true;
let isRaining = true;
let isSunny = false;
console.log(isDayOfWeek && isRaining);
console.log(isSunny || isRaining);
console.log(!isSunny);
console.log(isDayOfWeek === isRaining);
console.log("5" == 5); // true, equal in value and data type
console.log("5" === 5); // false, distinct data types
console.log("hello" < "hello world"); // true, lexical comparison
console.log("vlad" > "sergio"); // true, lexical comparison


// Math object
console.log(Math.max(5, 10)); // 10
console.log(Math.min(10, Math.PI)); // Math.PI
console.log(Math.abs(-1)); // 1
console.log(Math.floor(0.5)); // 0
console.log(Math.ceil(0.5)); // 1
console.log(Math.log2(32)); // 5
console.log(Math.round(3.5)); // 4

// Number object
console.log(Number.parseInt("5")); // 5
console.log(typeof Number.parseInt("5")); // number
console.log(Number.parseFloat("2.3")); // number
console.log(typeof Number.parseFloat("2.3")); // number
console.log(Number.isFinite(1/0)); // false
console.log(Number.isNaN(1/0)); // infinity is not a number
console.log(1/0); // Infinity
console.log(Number.EPSILON);

// Arrays
const values = [Math.E, true, null, "sergio"];
console.log(values.length); // 4
console.log(values.pop()); // "sergio"
console.log(values.length); // 3
console.log(values.push('garcia')); // add element at end: results in 4 (length of array after push)
console.log(values.length); // 4
console.log(values.indexOf(null)); // 2
console.log(values.slice(1)); // subarray, starting at index 1
console.log(values.length); // original array unchanged
console.log(values.shift()); // remove first element
console.log(values.length); // array changed.. 3 elements now
console.log(values.unshift(Math.PI)); // add element at beginning
console.log(values.length); // length 4 now
console.log(values);
console.log(values.toString()); // string representation of array
console.log(values.splice(1)); // deletes all elements starting at index 1, and return those elements as an array
console.log(values); // array is modified, has non-deleted elements.
values.push(false, 'peggy'); // push multiple elements at once
console.log(values); // [Math.PI, false, 'peggy']
values.forEach(v => console.log(v));
console.log([1, 2] === [1,2]); // false
console.log([1,2].toString() === [1, 2].toString()); // true