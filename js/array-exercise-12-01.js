const people = ["Greg", "Mary", "Devon", "James"];

// people.shift(); // removes "Greg" and returns it. ["Mary", "Devon", "James"]
// people.pop(); // removes "James" and returns it. ["Mary", "Devon"]
// people.unshift("Matt"); // add "Matt" to the front of array. ["Matt", "Mary", "Devon"]
// people.push("Sergio"); // add "Sergio" to the end of the array. ["Matt", "Mary", "Devon", "Sergio"]
const copy = people.slice(2); 
console.log(people); // unchanged; still ["Matt", "Mary", "Devon", "Sergio"]
console.log(copy); // ["Devon", "Sergio"]

console.log(people.indexOf("Mary")); // 1
console.log(people.indexOf("Foo")); // -1 since not found.
people.splice(2, 1, "Elizabeth", "Artie"); // Devon at index 2; remove 1 element starting there. Rest of arguments are ones to add starting at that 2 location.
console.log(people);

const withBob = people.concat("Bob"); // adds "Bob" to the array
// const withBob = people + "Bob"; // converts people array to a string, and concatenates "Bob" to it.
console.log(withBob);