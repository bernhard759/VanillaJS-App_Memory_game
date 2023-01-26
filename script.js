// Tile container
const tileContainer = document.querySelector(".tiles");

// Animal icons
const icons = {
  crane: "./img/icons8-crane-bird-96.png",
  parakeet: "./img/icons8-parakeet-96.png",
  parrot: "./img/icons8-parrot-96.png",
  pelican: "./img/icons8-pelican-96.png",
  woodpecker: "./img/icons8-woodpecker-96.png",
};

// Helper variables
const iconsPickList = [...Object.entries(icons), ...Object.entries(icons)];
const tileCount = iconsPickList.length;

// Pairs output
const pairs = document.querySelector("div.pairs");

// Game state
let revealedCount = 0;
let activeTile = null;
let flipBackOver = false;

// Build the tiles
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * iconsPickList.length);
  const icon = iconsPickList[randomIndex];
  console.log(icon[1]);
  // Build the tile
  const tile = buildTile(icon);
  iconsPickList.splice(randomIndex, 1);
  // Append document to the tile container
  tileContainer.appendChild(tile);
}

/** Build the tile component by creating HTML elements and peending tem to the DOM */
function buildTile(icon) {
  // Create tile elements
  const element = document.createElement("div");
  const tileFront = document.createElement("div");
  const tileBack = document.createElement("div");
  tileFront.classList.add("tile__front");
  tileFront.style.backgroundImage = `repeating-linear-gradient(45deg, steelblue 0%,
    steelblue 10%,
    lightsteelblue 10%,
    lightsteelblue 20%)`;
  tileBack.classList.add("tile__back");
  tileBack.style.backgroundImage = `url(${icon[1]})`;
  element.appendChild(tileFront);
  element.appendChild(tileBack);
  element.classList.add("tile");
  element.setAttribute("data-icon", icon[0]);
  element.setAttribute("data-revealed", "false");
  element.setAttribute("data-flipped", "false");
  // Click eventlistener
  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed"); // tile is revealed
    // Guard
    if (flipBackOver || revealed === "true" || element === activeTile) {
      return;
    }
    // Tile is now flipped
    element.setAttribute("data-flipped", "true");
    // Check if activeTile variable is false
    if (!activeTile) {
      // Tile is now active
      activeTile = element;
      return;
    }
    const iconToMatch = activeTile.getAttribute("data-icon");
    if (iconToMatch == icon[0]) {
      // Label the tile and activeTile as revealed
      activeTile.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");
      flipBackOver = false;
      activeTile = null;
      revealedCount += 2;
      pairs.querySelector("output").textContent = revealedCount / 2;
      // Check if game is complete
      if (revealedCount === tileCount) {
        setTimeout(function () {
          if (!alert("The memory game is completed :)")) {
            window.location.reload();
          }
        }, 500);
      }
    } else {
      // Attempt to match
      flipBackOver = true;
      setTimeout(() => {
        // Unflip the tiles
        element.setAttribute("data-flipped", "false");
        activeTile.setAttribute("data-flipped", "false");
        flipBackOver = false;
        activeTile = null;
      }, 1000);
    }
  });

  return element;
}
