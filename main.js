const audio = document.getElementById("bg-music");
const btn = document.getElementById("unmute");

btn.addEventListener("click", () => {
  audio.muted = false;
  audio.play();
});

const tilesContainer = document.querySelector(".tiles");
const colors = [
  "aqua",
  "aquamarine",
  "crimson",
  "blue",
  "dodgerblue",
  "gold",
  "greenyellow",
  "teal",
];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;
// console.log(tileCount);
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(color) {
  const element = document.createElement("div");
  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", false);

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");
    if (awaitingEndOfMove || revealed == "true" || element === activeTile) {
      return;
    }
    element.style.backgroundColor = color;

    if (!activeTile) {
      activeTile = element;

      return;
    }

    const colorToMatch = activeTile.getAttribute("data-color");
    if (colorToMatch === color) {
      activeTile.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");
      awaitingEndOfMove = false;
      activeTile = null;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        alert("You win! Refresh to play again.");
      }

      return;
    }

    awaitingEndOfMove = true;
    setTimeout(() => {
      element.style.backgroundColor = null;
      activeTile.style.backgroundColor = null;

      awaitingEndOfMove = false;
      activeTile = null;
    }, 1000);
  });

  return element;
}

// Build up tiles
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
  const color = colorsPicklist[randomIndex];
  const tile = buildTile(color);
  colorsPicklist.splice(randomIndex, 1); // remove that color so it can't be picked again// When we say “remove the color”, we mean delete that value from the array, so the array becomes shorter and no longer contains that color.
  tilesContainer.appendChild(tile);
}
