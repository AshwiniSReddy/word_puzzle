const words = ["APJ","SLV","ISRO","DRDO","AGNI","MIT","KALAM","INDIA","SPACE","PURA","WINGS"];
let foundWords = [];

// APJ
// SLV
// ISRO
// DRDO
// AGNI
// MIT
// KALAM
// INDIA
// SPACE
// ROHINI
// PURA
// WINGS

let isSelecting = false;
let selected = [];

const boxes = document.querySelectorAll('.box');

function selectBox(box) {
  if (!selected.includes(box)) {
    box.classList.add('highlight');
    selected.push(box);
  }
}

// --- Mouse events ---
boxes.forEach(box => {
  box.addEventListener('mousedown', () => {
    isSelecting = true;
    selectBox(box);
  });
  box.addEventListener('mouseover', () => {
    if (isSelecting) selectBox(box);
  });
});

// --- Touch events ---
document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const box = document.elementFromPoint(touch.clientX, touch.clientY);
  if (box && box.classList.contains('box')) {
    isSelecting = true;
    selectBox(box);
  }
});

document.addEventListener('touchmove', (e) => {
  e.preventDefault(); // prevent scrolling
  const touch = e.touches[0];
  const box = document.elementFromPoint(touch.clientX, touch.clientY);
  if (box && box.classList.contains('box')) {
    selectBox(box);
  }
});

document.addEventListener('touchend', () => {
  if (isSelecting) {
    isSelecting = false;
    checkWord();
  }
});

// --- Mouse up ---
document.addEventListener('mouseup', () => {
  if (isSelecting) {
    isSelecting = false;
    checkWord();
  }
});

// --- Check word ---
function checkWord() {
  if (selected.length === 0) return;

  const word = selected.map(b => b.textContent).join('');

  if (words.includes(word) && !foundWords.includes(word)) {
    selected.forEach(b => b.classList.add('found'));
    foundWords.push(word);
  } else {
    selected.forEach(b => b.classList.remove('highlight'));
  }

  selected = [];

  if (foundWords.length === words.length) {
    setTimeout(resetGrid, 1000);
  }
}

// --- Reset ---
function resetGrid() {
  boxes.forEach(b => b.classList.remove('found', 'highlight'));
  foundWords = [];
}
