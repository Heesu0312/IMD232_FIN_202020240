let marshmallows = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('#87CEEB');

  for (let i = marshmallows.length - 1; i >= 0; i--) {
    marshmallows[i].update();
    marshmallows[i].display();

    if (marshmallows[i].isOffscreen()) {
      marshmallows.splice(i, 1);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 5; i++) {
    marshmallows.push(new Marshmallow(mouseX, mouseY));
  }
}

class Marshmallow {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 40);
    this.color = color(255, 228, 196, 90);
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    let angle = atan2(mouseY - this.y, mouseX - this.x);
    this.x += cos(angle) * 2;
    this.y += sin(angle) * 2;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  isOffscreen() {
    return (
      this.x < 0 ||
      this.x > width ||
      this.y < 0 ||
      this.y > height ||
      this.size < 0
    );
  }
}
