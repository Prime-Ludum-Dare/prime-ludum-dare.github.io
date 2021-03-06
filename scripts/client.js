console.log('client.js loaded');

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const gravity = 20;
const timeStep = 0.1;

let numberOfLives = 10;

let keyPressed = {
  up: false,
  down: false,
  right: false,
  left: false,
};

const world = {
  spawn: {
    X: 100,
    Y: 400,
  },
  width: 5000,
  height: 600,
};

const worldList = [];
const platformList = [];
const collidableList = [];

let playerHUD;

function winGame() {
  alert('Yay, you won! Congratulations!');
  numberOfLives = 10;
  player.spawn();
  keyPressed = {
    up: false,
    down: false,
    right: false,
    left: false,
  };
}

function loseGame() {
  alert('Oh no! You are out of cows! Reload to try again.');
}

const init = () => {
  // get the canvas so we can draw on it

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  playerHUD = new HUD();
  buildLevel();
  player.spawn();

  setInterval(draw, 10);
};

buildLevel = () => {
  // note it is crucial that the platforms stay in order of largest Y to smallest.
  new PlatformWithBoar(1100, 550, 300);
  new Platform(400, 500, 200);
  new PlatformWithBoar(1100, 250, 250);
  new Platform(700, 400, 100);
  new Wyvern(700, 200, 300, 150);
  new Spikes(400, 575, 500, 25);
  new Spikes(1500, 575, 2500, 25);
  new PlatformWithBoar(2550, 400, 500);
  new Wyvern(2600, 100, 400, 100);
  new Platform(3200, 300, 400);
  new Goal(4400, 408);
};

keyDownHandler = event => {
  if (event.keyCode == 39) {
    keyPressed.right = true;
  } else if (event.keyCode == 37) {
    keyPressed.left = true;
  } else if (event.keyCode == 38) {
    keyPressed.up = true;
  } else if (event.keyCode == 40) {
    keyPressed.down = true;
  }
};

keyUpHandler = event => {
  if (event.keyCode == 39) {
    keyPressed.right = false;
  } else if (event.keyCode == 37) {
    keyPressed.left = false;
  } else if (event.keyCode == 38) {
    keyPressed.up = false;
  } else if (event.keyCode == 40) {
    keyPressed.down = false;
  }
};

const draw = () => {
  camera.move();

  background.render();

  // // draw the things
  for (platform of platformList) {
    platform.render();
  }
  for (object of worldList) {
    object.render();
  }
  for (enemy of collidableList) {
    enemy.render();
  }

  playerHUD.render();
};

const sortPlatforms = () => {
  platformList.sort((a, b) => {
    return b.Y - a.Y;
  });
};
