let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < 30; i++) {
    stars.push(new Star(random(width), random(height)));
  }
}

function draw() {
  background('#87CEEB');

  for (let star of stars) {
    star.update();
    star.display();
    star.interact();
  }
}

function mousePressed() {
  for (let i = stars.length - 1; i >= 0; i--) {
    let distance = dist(mouseX, mouseY, stars[i].x, stars[i].y);
    if (distance < stars[i].interactionRadius) {
      stars.splice(i, 1);
    }
  }
}

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseSize = random(5, 20);
    this.size = this.baseSize;
    this.color = color(
      random(200, 255),
      random(200, 255),
      random(200, 255),
      random(150, 255)
    );
    this.twinkleSpeed = random(0.01, 0.1);
    this.angle = random(TWO_PI);
    this.twinkle = random(0, PI / 8);
    this.interactionRadius = 50;
  }

  disappear() {
    this.color.levels[3] = lerp(this.color.levels[3], 0, 0.1);
  }

  update() {
    this.angle += this.twinkleSpeed;
    this.twinkle = (sin(this.angle) * PI) / 8;
  }

  display() {
    fill(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      this.color.levels[3] * 0.5
    );

    push();
    translate(this.x, this.y);
    rotate(this.twinkle);
    for (let i = 0; i < 5; i++) {
      let x = cos((TWO_PI / 5) * i) * this.size;
      let y = sin((TWO_PI / 5) * i) * this.size;
      ellipse(x, y, this.size * 2);
    }
    pop();
  }

  interact() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < this.interactionRadius) {
      this.size = lerp(this.size, this.baseSize * 1.5, 0.1);
    } else {
      this.size = lerp(this.size, this.baseSize, 0.1);
    }
  }
}
