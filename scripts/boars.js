boarSprites = {
  image: new Image(),
  left: [],
  right: [],
};

boarSprites.image.src = 'resources/sprites/whtdragonswildboar.png';

boarSprites.left.push({ X: 0, Y: 49 });
boarSprites.left.push({ X: 49, Y: 49 });
boarSprites.left.push({ X: 97, Y: 49 });
boarSprites.left.push({ X: 49, Y: 49 });

boarSprites.right.push({ X: 0, Y: 97 });
boarSprites.right.push({ X: 49, Y: 97 });
boarSprites.right.push({ X: 97, Y: 97 });
boarSprites.right.push({ X: 49, Y: 97 });

class Boar extends collidable {
  constructor(platformNumber) {
    let plat = platformList[platformNumber];
    let platX = plat.X + plat.width / 2;
    let platY = plat.Y - 60 * 1.5;
    super(platX, platY, 60, 60);
    this.platform = plat;
    this.facingRight = false;
    this.sprites = boarSprites;
    this.animationFrame = 0;
    this.animationDelay = 20;
    this.animationFrameMax = this.sprites.left.length * this.animationDelay - 1;
    this.speed = 1;
  }

  move() {
    //handle movement
    this.checkEdge();
    if (this.facingRight) {
      this.X += this.speed;
    } else {
      this.X -= this.speed;
    }
    this.animationFrame++;

    if (this.animationFrame > this.animationFrameMax) {
      this.animationFrame = 0;
    }
  }

  checkEdge() {
    if (
      this.facingRight &&
      this.X + this.width > this.platform.X + this.platform.width
    ) {
      this.facingRight = false;
    } else if (this.X < this.platform.X) {
      this.facingRight = true;
    }
  }

  render() {
    this.move();
    let currentSprite = !this.facingRight
      ? this.sprites.left[Math.trunc(this.animationFrame / this.animationDelay)]
      : this.sprites.right[
          Math.trunc(this.animationFrame / this.animationDelay)
        ];
    ctx.drawImage(
      this.sprites.image,
      currentSprite.X,
      currentSprite.Y,
      47,
      47,
      this.X - camera.X,
      this.Y - camera.Y,
      this.width * 1.5,
      this.height * 1.5
    );
    this.checkCollision();
  }

  doHit() {
    player.getHit();
  }
}
