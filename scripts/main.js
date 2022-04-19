const notes = Array.from(document.getElementsByClassName("key"));
const play = document.getElementById("play");


let mouseDown = 0;
document.body.onmousedown = function () {
  ++mouseDown;
};
document.body.onmouseup = function () {
  --mouseDown;
};



// BOTTOM KEYS
for (let i = 0; i < 29; i++) {
  const key = document.getElementsByClassName("key")[i];
  key.addEventListener("mouseover", () => {
    if (mouseDown && !key.classList.contains("selected")) {
      key.classList.toggle("selected");
    } 
  });
}

for (let i = 0; i < 29; i++) {
  const key = document.getElementsByClassName("key")[i];
  key.addEventListener("mousedown", () => {
    key.classList.toggle("selected");
  });
}


play.addEventListener("click", () => {
  window.localStorage.setItem("notesArray", selectedNotes());
  return window.location.assign("../pages/game.html");
});

function selectedNotes() {
  return notes
    .filter((e) => e.classList.contains("selected"))
    .map((e) => e.dataset["note"]);
}