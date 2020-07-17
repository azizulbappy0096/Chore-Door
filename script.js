let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');
let currentStreak = document.getElementById('current-score');
let bestStreak = document.getElementById('best-score');

let openDoor1;
let openDoor2;
let openDoor3;


let numClosedDoor = 3;
let currentlyPlaying = true;
let score = 0;
let bestScore = 0;
currentStreak.innerHTML = score;
bestStreak.innerHTML = bestScore;

let botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

const isBot = (door) => {
  if(door.src === botDoorPath) {
    return true;
  }else {
    return false;
  }
};

const isClicked = door => {
  if(door.src === closedDoorPath) {
    return false;
  }else {
    return true;
  }
};

const gameOver = (status) => {
    if(status === 'win') {
      startButton.innerHTML = 'You win! Play again?';
      getScore();
    }else {
      startButton.innerHTML = 'Game over! Play again?';
      score = 0;
      currentStreak.innerHTML = score; 
    }
    currentlyPlaying = false;
};

const playDoor = (door) => {
  numClosedDoor--;
  if (numClosedDoor === 0) {
    gameOver('win');
  }
  else if(isBot(door)) {
    gameOver();
  }
};

let randomChoreDoorGenerator = () => {
  let choreBotDoor = Math.floor(Math.random() * numClosedDoor);

  if(choreBotDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  }
  else if(choreBotDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor3 = spaceDoorPath;    
  }
  else if(choreBotDoor === 2) {
    openDoor3 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor1 = spaceDoorPath;    
  }    
};

doorImage1.onclick = function () {
  if(currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  } 
};

doorImage2.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage2)) {
   doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

doorImage3.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

startButton.onclick = () => {
  if(!currentlyPlaying) {
    startRound();
  }
  
};

function startRound() {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoor = 3;
  currentlyPlaying = true;
  startButton.innerHTML = 'Good luck!';
  randomChoreDoorGenerator();
};

let getScore = () => {
  score++;
  currentStreak.innerHTML = score;
  if(score > bestScore) {
    bestScore = score;
    bestStreak.innerHTML = bestScore;
  }
};

startRound();

