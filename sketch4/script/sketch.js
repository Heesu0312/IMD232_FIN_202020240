let stars = [];
const numStars = 50;
const lineThreshold = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < numStars; i++) {
    stars.push(new Star(random(width), random(height)));
  }
}

function draw() {
  background('#87CEEB');

  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      let distance = dist(stars[i].x, stars[i].y, stars[j].x, stars[j].y);

      if (distance < lineThreshold) {
        stroke(255, 150);
        line(stars[i].x, stars[i].y, stars[j].x, stars[j].y);
      }
    }
  }

  for (let star of stars) {
    star.update();
    star.display();
    star.interact();
  }

  if (random() > 0.98) {
    stars.push(new Star(random(width), random(height)));
  }

  stars = stars.filter((star) => !star.shouldRemove());
}

function mousePressed() {
  for (let i = stars.length - 1; i >= 0; i--) {
    let distance = dist(mouseX, mouseY, stars[i].x, stars[i].y);
    if (distance < stars[i].interactionRadius) {
      stars[i].explode();
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
    this.exploding = false;
    this.explosionSize = 10;
    this.fadeOutSpeed = 4;
  }

  explode() {
    this.exploding = true;
  }

  shouldRemove() {
    return this.exploding && this.explosionSize > 100;
  }

  update() {
    this.angle += this.twinkleSpeed;
    this.twinkle = (sin(this.angle) * PI) / 8;

    if (this.exploding) {
      this.explosionSize *= 1.1;
      this.color.levels[3] -= this.fadeOutSpeed;
    }
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

    if (this.exploding) {
      fill(
        this.color.levels[0],
        this.color.levels[1],
        this.color.levels[2],
        this.color.levels[3] * 0.5
      );
      ellipse(this.x, this.y, this.explosionSize);
    }
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
