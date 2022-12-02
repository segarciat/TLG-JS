// 1
let container = document.getElementById("container");
console.log(container);
// 2
container = document.querySelector("#container");
console.log(container);
// 3
let secondListItems = document.querySelectorAll("li.second");
console.log(secondListItems);
// 4
const li = document.querySelector("ol>li.third");
console.log(li);
// 5
container.append("Hello!");
// 6
let footer = document.querySelector(".footer");
footer.classList.add("main");
console.log(footer.classList);
// 7
footer.classList.remove("main");
console.log(footer.classList);
// 8
let newLi = document.createElement("li");
console.log(newLi);
// 9
newLi.textContent = "four";
console.log(newLi);
// 10
let ul = document.querySelector("ul");
ul.append(newLi);
// 11
const olItems = document.querySelectorAll("ol>li");
olItems.forEach((li) => (li.style.backgroundColor = "green"));
// 12
document.querySelector(".footer").remove();
