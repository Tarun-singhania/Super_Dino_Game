let score = 0;
let isScoreUpdate = true;
let isGameOver = false;

const startGame = document.getElementById("startGame");
const mainContainer = document.querySelector(".gameContainer");
const infoContainer = document.getElementById("intro_Page");
const hiscoreBox = document.getElementById("hiscoreBox");

music = new Audio("music.mp3");
musicGo = new Audio("gameover.mp3");
musicCongo = new Audio("Congratulations Kgf.mp3");

const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  music.play();
});

// For Mobile
mainContainer.addEventListener("click", () => {
  if(mainContainer.offsetWidth < 430){
    dino = document.querySelector(".dino");
    dino.classList.add("animatedDinoMove1");
    setTimeout(() => {
      dino.classList.remove("animatedDinoMove1");
    }, 700);
  }
  // Click of Laptop use:
  else{
    dino = document.querySelector(".dino");
  dino.classList.add("animatedDinoMove");
  setTimeout(() => {
    dino.classList.remove("animatedDinoMove");
  }, 700);
  }
});

document.onkeydown = function (e) {
  if (mainContainer.offsetWidth > 430) {
    if (e.key === "ArrowUp") {
      dino = document.querySelector(".dino");
      dino.classList.add("animatedDinoMove");
      setTimeout(() => {
        dino.classList.remove("animatedDinoMove");
      }, 700);
    } else if (e.key === "ArrowRight") {
      dino = document.querySelector(".dino");
      dinoX = parseInt(dino.getBoundingClientRect().x);
      dino.style.left = dinoX + 100 + "px";
    } else if (e.key === "ArrowLeft") {
      dino = document.querySelector(".dino");
      dinoX = parseInt(dino.getBoundingClientRect().x);
      dino.style.left = dinoX - 100 + "px";
    }
  }
};

// Main function
const PlayGame = () => {
  setInterval(() => {
    if (!isGameOver) {
      dino = document.querySelector(".dino");
      gameOver = document.querySelector(".gameOver");
      dragon = document.querySelector(".dragon");

      //It is not working-->
      // dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
      // dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

      // drx=parseInt(window.getComputedStyle(dragon,null).getPropertyValue('left'));
      // dry=parseInt(window.getComputedStyle(dragon,null).getPropertyValue('top'));

      dx = parseInt(dino.getBoundingClientRect().x);
      dy = parseInt(dino.getBoundingClientRect().y);

      drx = parseInt(dragon.getBoundingClientRect().x);
      dry = parseInt(dragon.getBoundingClientRect().y);

      offsetX = Math.abs(dx - drx);
      offsetY = Math.abs(dy - dry);

      // For Laptop
      if (mainContainer.offsetWidth > 430) {
        if (offsetX < 85 && offsetY < 37) {
          isGameOver = true;
          gameOver.querySelector(".text").innerHTML =
            "Game Over-Refresh & Play Again";
          dragon.classList.remove("animatedDragonMove");
          isScoreUpdate = false;
          dino.style.display="none";
          isHighScore();

          setTimeout(() => {
            musicGo.play();
            music.pause();
            setTimeout(() => {
              musicGo.pause();
            }, 900);
          }, 0);
          mainContainer.innerHTML += `<button id="restart-btn">Restart Game</button>`;
          const restartBtn = document.getElementById("restart-btn");
          restartBtn.addEventListener("click", () => {
            window.location.reload();
          });
        } else if (offsetX < 85 && isScoreUpdate) {
          isScoreUpdate = false;
          score++;
          scoreUpdate(score);
          setTimeout(() => {
            isScoreUpdate = true;
          }, 1000);
          setTimeout(() => {
            // Here .getBoundingClientRect is not working
            aniDur = parseFloat(
              window
                .getComputedStyle(dragon, null)
                .getPropertyValue("animation-duration")
            );
            newDur = aniDur - 0.1;
            if (newDur < 4) {
              newDur = aniDur;
            }
            dragon.style.animationDuration = newDur + "s";
          }, 500);
        }
      }
      // For Mobile
      else {
        if (offsetX < 55 && offsetY < 20) {
          isGameOver = true;
          gameOver.querySelector(".text").innerHTML =
            "Game Over-Refresh & Play Again";
          dragon.classList.remove("animatedDragonMove");
          isScoreUpdate = false;
          dino.style.display="none"
          isHighScore();

          setTimeout(() => {
            musicGo.play();
            music.pause();
            setTimeout(() => {
              musicGo.pause();
            }, 900);
          }, 0);
          mainContainer.innerHTML += `<button id="restart-btn">Restart Game</button>`;
          const restartBtn = document.getElementById("restart-btn");
          restartBtn.addEventListener("click", () => {
            window.location.reload();
          });
        } else if (offsetX < 55 && isScoreUpdate) {
          isScoreUpdate = false;
          score++;
          scoreUpdate(score);
          setTimeout(() => {
            isScoreUpdate = true;
          }, 1000);
          setTimeout(() => {
            // Here .getBoundingClientRect is not working
            aniDur = parseFloat(
              window
                .getComputedStyle(dragon, null)
                .getPropertyValue("animation-duration")
            );
            newDur = aniDur - 0.15;
            if (newDur < 3.2) {
              newDur = aniDur;
            }
            console.log(newDur);
            dragon.style.animationDuration = newDur + "s";
          }, 500);
        }
      }
    }
  }, 10);
};
// HighScore
let hiscore = localStorage.getItem("hiscore"); //hiscore=0
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "Hi Score :" + hiscoreval;
}

// Intro_Page
startGame.addEventListener("click", () => {
  infoContainer.style.display = "none";
  mainContainer.style.display = "flex";
  PlayGame();
});

// Functions
function scoreUpdate(score) {
  dragon = document.querySelector(".dragon");
  if (score > hiscoreval) {
    hiscoreval = score;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
    hiscoreBox.innerHTML = "Hi Score :" + hiscoreval;
  }
  document.querySelector(".scoreCont").innerHTML = `Your Score:${score}`;
}

function isHighScore() {
  hiscore = parseInt(hiscore);
  if (score > hiscore) {
    let name = prompt("Enter Your Name");
    musicCongo.play();
    mainContainer.innerHTML = `
      <div 
          style="
          display:flex;
          padding:10px;
          flex-direction:column-reverse;
          background:none;
          width:100%;
          align-items:center;
      ">
          <h1 style="
              color:blue;
              font-size:48px">
              Hi,${name}<br>Congralutions<br>You Are the Higher Scorer.
          </h1>
          <img style="width:50vw;height:60vh;margin:0 auto" src="ImageCongo.gif">
      </div>
      `;
  }
}
