/**
 * By: Miguel Rubio
 * For: GameArt Reclutment Team
 *
 * Stay Safe!
 */

// CONSTANTS
const symbols = [
  "fig1",
  "fig2",
  "fig3",
  "fig4",
  "fig5",
  "fig6",
  "fig7",
  "fig8",
];
const reel1 = ["fig1", "fig2", "fig3", "fig4", "fig5", "fig6", "fig7", "fig8"];
const reel2 = ["fig1", "fig2", "fig3", "fig4", "fig5", "fig6", "fig7", "fig8"];
const reel3 = ["fig1", "fig2", "fig3", "fig4", "fig5", "fig6", "fig7", "fig8"];
const reel4 = ["fig1", "fig2", "fig3", "fig4", "fig5", "fig6", "fig7", "fig8"];
const GL_TEXT = "Good Luck!";
const BLNT_TEXT = "Better Luck Next Time";
const WIN_TEXT = "Winner!";
const max = symbols.length - 1;
const displayReel1 = document.getElementById("reel1");
const displayReel2 = document.getElementById("reel2");
const displayReel3 = document.getElementById("reel3");
const displayReel4 = document.getElementById("reel4");
const headerMessage = document.getElementById("messages");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("ResetBtn");
const velocity = 90;
// CONTROL
let animate = false;
let gIndex;
//
shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

shuffleAll = () => {
  shuffle(reel1);
  shuffle(reel2);
  shuffle(reel3);
  shuffle(reel4);
};

buildReel = (arr, i, reel) => {
  gIndex = i;
  let middle = arr[gIndex];
  let top = gIndex + 1 > max ? arr[0] : arr[gIndex + 1];
  let bot = gIndex - 1 < 0 ? arr[max] : arr[gIndex - 1];
  reel.querySelector("#slot1").src = `images/${top}.PNG`;
  reel.querySelector("#slot2").src = `images/${middle}.PNG`;
  reel.querySelector("#slot3").src = `images/${bot}.PNG`;
};

startBtn.onclick = () => {
  headerMessage.innerText = GL_TEXT;
  startBtn.disabled = true;
  resetBtn.disabled = true;
  clearStatus();
  animate = true;
  shuffleAll();
  (reelRotation = (i) => {
    setTimeout(() => {
      [
        { R: reel1, C: i, D: displayReel1 },
        { R: reel2, C: i, D: displayReel2 },
        { R: reel3, C: i, D: displayReel3 },
        { R: reel4, C: i, D: displayReel4 },
      ].map(({ R, C, D }) => {
        buildReel(R, C, D);
      });
      i--;
      if (i === 0) {
        shuffleAll();
        i = max;
      }
      animate ? reelRotation(i) : getResults();
    }, velocity);
  })(max);
};

getResults = () => {
  reel1[gIndex] === reel2[gIndex] && reel1[gIndex] === reel3[gIndex]
    ? addWinninClass([displayReel1, displayReel2, displayReel3])
    : reel1[gIndex] === reel2[gIndex] && reel1[gIndex] === reel4[gIndex]
    ? addWinninClass([displayReel1, displayReel2, displayReel4])
    : reel1[gIndex] === reel3[gIndex] && reel1[gIndex] === reel4[gIndex]
    ? addWinninClass([displayReel1, displayReel3, displayReel4])
    : reel2[gIndex] === reel3[gIndex] && reel2[gIndex] === reel4[gIndex]
    ? addWinninClass([displayReel2, displayReel3, displayReel4])
    : (headerMessage.innerText = BLNT_TEXT);
};

stopBtn.onclick = () => {
  animate = false;
  resetBtn.disabled = false;
  startBtn.disabled = false;
};

resetBtn.onclick = () => {
  animate = false;
  defaultView();
};

addWinninClass = (arr) => {
  arr.map((elm) => {
    elm.querySelector("#slot2").classList.add("winner");
  });
  headerMessage.innerText = WIN_TEXT;
};

clearStatus = () => {
  [displayReel1, displayReel2, displayReel3, displayReel4].map((elm) => {
    elm.querySelector("#slot1").classList.remove("winner", "others");
    elm.querySelector("#slot2").classList.remove("winner", "others");
    elm.querySelector("#slot3").classList.remove("winner", "others");
  });
};

defaultView = () => {
  [displayReel1, displayReel2, displayReel3, displayReel4].map((elm) => {
    elm.querySelector("#slot1").src = `images/${symbols[0]}.PNG`;
    elm.querySelector("#slot2").src = `images/${symbols[1]}.PNG`;
    elm.querySelector("#slot3").src = `images/${symbols[2]}.PNG`;
  });
  clearStatus();
  headerMessage.innerText = GL_TEXT;
};
