const sentence = "Peggy Sue";

// String slicing; it's like substring.
console.log(sentence.slice(6)); // "Sue"
console.log(sentence.slice(-5)); // "y Sue"
console.log(sentence.slice(-9, -4)); // "Peggy"

const localhostIP = "127.0.0.1";

// String split method
const bitGroups = localhostIP.split(".");
console.log(bitGroups);

const url = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split";

const splitURL = url.split("://");

const protocol = splitURL[0];
const restOfURL = splitURL[1];
console.log(protocol);
console.log(restOfURL);

const domain = restOfURL.split("/")[0];
console.log(domain);

// String slice with indexOf together
const path = restOfURL.slice(restOfURL.indexOf("/en-US"));
console.log(path);

// Regex
const stringSliceMDNURL = url.replace("split", "slice");
console.log(stringSliceMDNURL);

const homeDirectory = "/c/Users/gtsergio";
console.log(homeDirectory);

// Changing all (g) forward slashes (/) to backslashes (\).
const re = /\//g;
const backSlasHomeDirectory = homeDirectory.replace(re, "\\");
console.log(backSlasHomeDirectory);

const gymBadges = Number.parseInt(prompt("How many badges do you have?"));

if (Number.isNaN(gymBadges) || gymBadges < 0 || gymBadges > 8) {
    console.log("Who are you trying to fool?");
} else if (gymBadges === 8){
    console.log("You may enter the Indigo League.");
} else {
    console.log("Come back after you've obtained your 8th gym badge.");
}