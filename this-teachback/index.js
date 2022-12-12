/**
 * 'this' refers to an object in the current context/scope.
 * It's important to note that *everything* in JavaScript is an object.
 */

/**
 * Example 1: Object's method loses 'this' when used as event listener.
 */
const cat = {
  name: "Peggy",
  numberOfMeows: function () {
    return Math.ceil(Math.random() * 50); // between 1 and 50 meows.
  },
  greeting: function () {
    console.log(this);
    const count = this.numberOfMeows();
    console.log(`${this.name} meowed ${count} times`);
  },
};

// 'this' is the cat object.
cat.greeting();

// 'this' is the button that was clicked; lost access to this.name.
document.getElementById("meowButton").addEventListener("click", cat.greeting);

// Let's try it a different way
let peggyGreeting = cat.greeting;

// 'this' is the Window object now.
// peggyGreeting();

/**
 * The previous example showed that 'this' was changed depending on the context.
 * Objective: ensure 'this' retains the original cat object (we want Peggy!)
 */

/**
 * Example 2: A function with a lot of arguments; the DRY principle.
 */

function linkBuilder(protocol, domain) {
  console.log(`${protocol}://${domain}`);
}

// This is very repetitive! There must be a better way.
linkBuilder("https", "google.com");
linkBuilder("https", "youtube.com");
linkBuilder("https", "neopets.com");

linkBuilder("http", "example.com");
linkBuilder("http", "info.cern.ch");

/**
 * Example 3: 'this' in the global scope is Window (in browser) or NodeJS global object.
 */
console.log(this);

// Proceeding assuming we are on the browser... at this scope, the following are equivalent.
console.log(location);
console.log(window.location);
console.log(this.location);

/**
 * Example 4: For functions defined on global scope, 'this' is still the Window.
 */

function answerToLife() {
  console.log(this);
  console.log(42);
}

answerToLife();
window.answerToLife();
this.answerToLife();

/**
 * Example 5: For functions inside objects, 'this' is the object itself.
 */

const person = {
  nickname: "Jay",
  age: 55,
  pi: 3.14,
  circleArea: function (radius) {
    console.log(this);
    console.log(this.pi);
    const area = this.pi * radius * radius;
    console.log(area);
  },
};

// 'this' is person
// 'this.pi' is 3.14
// 'area' is 12.56
person.circleArea(2);

/**
 * Example 6: Storing an object's method in a variable will deference 'this' from that object.
 */

let area = person.circleArea;

// 'this' is now the Window; that's the scope we're calling the function in (global)!
// 'this.pi' is undefined, because Window does not have a variable pi
// 'area' is NaN
area(2);

/**
 * Conclusion: Passing a function (not calling it) to a variable, or another function argument
 * may deference its 'this'.
 */

/**
 * Example 7: Calling function 'this' using .call method (available on function objects).
 */

// .call lets you set what will be 'this'
// Here, 'this' will be 'person'
// After that, you pass the arguments as normal.
area.call(person, 2); // same as our original person.circleArea(2)

// 'this' will now be Window.
// 'this.pi' is undefined just like before.
area.call(window, 2); // same issue from before.

const otherPerson = {
  pi: 0,
};

// 'this' will now be otherPerson.
// 'this.pi' will be 0, even though that's wrong.
area.call(otherPerson, 2);

/**
 * Example 8: Changing the default 'this' using .bind
 */

area = person.circleArea.bind(person);
area(7);

/**
 * Example 9: Changing default 'this' and passing more arguments.
 */

// Let's preset the radius argument to 1.
const unitCircleArea = person.circleArea.bind(person, 1);
unitCircleArea();

/**
 * Example 10: Fixing our cat variable issue using .call.
 */

// Success!
peggyGreeting.call(cat);

/**
 * Example 11: But... what if we want it right the first time? Use .bind
 */

peggyGreeting = cat.greeting.bind(cat);
peggyGreeting();

/**
 * Example 12: What about the button issue?
 */

// First remove the old, bad event listener
document
  .getElementById("meowButton")
  .removeEventListener("click", cat.greeting);

// Add new listener, but use bind to get our meows back.
// document
//   .getElementById("meowButton")
//   .addEventListener("click", cat.greeting.bind(cat));

// Equivalent to previous
document.getElementById("meowButton").addEventListener("click", peggyGreeting);

/**
 * Example 13: Staying DRY
 */

const httpsLink = linkBuilder.bind(null, "https");
const httpLink = linkBuilder.bind(null, "http");
httpsLink("google.com");

httpLink("example.com");

/**
 * Example 14: Arrow functions do not have their own 'this'.
 * It's called a lexical 'this', inherited from parent context.
 */

const fish = {
  species: "shark",
  swim: () => {
    console.log(this);
    console.log(`${this.species} is swimming`);
  },
  swimTwo: function () {
    console.log(this);
    console.log(`${this.species} is swimming`);
  },
};

fish.swim();
fish.swimTwo();

/**
 * Example 15: "use strict"; inside a function will dereference 'this' from Window object.
 */

function fn() {
  "use strict";
  console.log(this);
}

fn();
