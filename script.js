const h2 = document.createElement("h2");
h2.textContent = "This content added by JavaScript";

document.querySelector("body").appendChild(h2);

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");