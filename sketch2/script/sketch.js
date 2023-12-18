let dandelionSeeds = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 50; i++) {
    dandelionSeeds.push(new DandelionSeed(random(width), random(height)));
  }
}

function draw() {
  background('#87CEEB');

  for (let seed of dandelionSeeds) {
    let distance = dist(mouseX, mouseY, seed.x, seed.y);
    let force = 100 / (distance + 1);

    seed.move(force);
    seed.display();
  }
}
//GPT의 도움을 받았습니다요
class DandelionSeed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(2, 8);
    this.color = color(255, 255, 255);
    this.triangleOpacity = 70;
    this.speed = random(0.5, 2);
    this.angle = random(TWO_PI);
  }
  //GPT의 도움을 받았습니다요
  move(force) {
    let angleToMouse = atan2(mouseY - this.y, mouseX - this.x);
    this.x += cos(angleToMouse) * force * this.speed;
    this.y += sin(angleToMouse) * force * this.speed;

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);

    this.angle += random(-0.1, 0.1);
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = random(width);
      this.y = random(height);
    }
  }

  display() {
    stroke(255);
    strokeWeight(1);
    line(this.x, this.y - this.size / 2, this.x, this.y - this.size);

    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);

    fill(255, this.triangleOpacity);
    noStroke();
    triangle(
      this.x - (cos(PI / 3) * this.size) / 2,
      this.y - this.size,
      this.x,
      this.y - this.size - 5,
      this.x + (cos(PI / 3) * this.size) / 2,
      this.y - this.size
    );
  }
}
