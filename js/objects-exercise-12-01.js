let programming = {
    languages: ["JavaScript", "Python", "Ruby"],
    isChallenging: true,
    isRewarding: true,
    difficulty: 8,
    jokes: "https://bit.ly/2ysFran"
};

console.log(programming);
programming.languages.push("Go"); // Add "Go" to the end of the languages array.
programming.difficulty = 7; // Change value of difficulty property to 7
delete programming.jokes; // Delete the jokes key from the difficulty object.
programming.isFun = true; // add key isFun with a value of true
console.log(programming);