function difference(x, y) {
    if (isNaN(x) || isNaN(y))
        return;
    return x - y;
}

function product (x, y) {
    if (isNaN(x) || isNaN(y))
        return;
    return x * y;
}

function printDay(n) {
    if (isNaN(n))
        return;
    const DAYS_OF_THE_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (1 <= n && n <= DAYS_OF_THE_WEEK.length)
        return DAYS_OF_THE_WEEK[n - 1];
}

function lastElement(arr) {
    if (arr && arr instanceof Array)
        return arr[arr.length - 1];
}

function numberCompare(x, y) {
    if (isNaN(x) || isNaN(y))
        return;
    if (x > y) {
        return "First is greater"
    } else if (x < y) {
        return "Second is greater";
    } else {
        return "Numbers are equal"
    }
}

function singleLetterCount(word, letter) {
    if ((typeof word !== 'string' && !(word instanceof String)) || (typeof letter !== 'string' && !(letter instanceof String)))
        return;
    letter = letter.toLowerCase();
    var count = 0;
    for (let i = 0; i < word.length; i++)
        if (word[i].toLowerCase() === letter)
            count++;
    return count;
}

function multipleLetterCount(str) {
    if (typeof str !== 'string' && !(str instanceof String))
        return;
    const frequencies = {};
    for (let i = 0; i < str.length; i++) {
        const letter = str[i];
        if (!frequencies[letter])
            frequencies[letter] = 0;
        frequencies[letter]++;
    }
    return frequencies;
}

function arrayManipulation(arr, command, location, value) {
    if (!(arr instanceof Array))
        return;
    const ADD = "add";
    const REMOVE = "remove";
    const BEGINNING = "beginning";
    const END = "end";
    if (command === ADD) {
        if (location === BEGINNING) {
            arr.unshift(value);
            return arr;
        } else if (location === END) {
            arr.push(value);
            return arr;
        }
    } else if (command === REMOVE && arr.length > 0){
        if (location === END) {
            return arr.pop();
        } else if (location === BEGINNING) {
            return arr.shift();
        }
    }
}

function isPalindrome(str) {
    if (typeof str !== 'string' && !(str instanceof String))
        return;
    // remove whitespace and perform as case-insensitive
    str = str.trim().toLowerCase().replace(/\s+/g, "");
    for (let i = 0; i < str.length / 2; i++){
        if (str[i] !== str[str.length - 1 - i])
            return false;
    }
    return true;
}

/**
 * Tests
 */

function productTest() {
    console.log(product(2,2)); // 4
    console.log(product(0,2)); // 0
}

function differentTest() {
    console.log(difference(2,2)); // 0
    console.log(difference(0,2)); // -2
}

function printDayTest() {
    console.log(printDay(4)); // "Wednesday"
    console.log(printDay(41)); // undefined
}

function lastElementTest() {
    console.log(lastElement([1,2,3,4])); // "Wednesday"
    console.log(lastElement([])); // undefined
}

function numberCompareTest() {
    console.log(numberCompare(1, 1)); // "Number are equal"
    console.log(numberCompare(2, 1)); // "First is greater"
    console.log(numberCompare(1, 2)); // "Second is greater"
}

function singleLetterCountTest() {
    console.log(singleLetterCount("amazing", 'A')); // 2
    console.log(singleLetterCount("Rithm School", 'O')); // 2

}

function multipleLetterCountTest() {
    console.log(multipleLetterCount("hello")); // {h:1, e: 1, l: 2, o:1}
    console.log(multipleLetterCount("person")); //{p:1, e: 1, r: 1, s:1, o:1, n:1}
}

function arrayManipulationTest() {
    console.log(arrayManipulation([1,2,3], "remove", "end")); // 3

    console.log(arrayManipulation([1,2,3], "remove", "beginning")); // 1

    console.log(arrayManipulation([1,2,3], "add", "beginning", 20)); // [20,1,2,3]

    console.log(arrayManipulation([1,2,3], "add", "end", 30)); // [1,2,3,30]
}

function isPalindromeTest() {
    console.log(isPalindrome('testing')); // false
    console.log(isPalindrome('tacocat')); // true
    console.log(isPalindrome('hannah')); // true
    console.log(isPalindrome('robert')); // false
    console.log(isPalindrome('a man a plan a canal Panama')); // true

}

productTest();
differentTest();
printDayTest();
lastElementTest();
numberCompareTest();
singleLetterCountTest();
multipleLetterCountTest();
arrayManipulationTest();
isPalindromeTest();