let snake;
let food;
let resolution = 20;

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let cols = floor(width / resolution);
  let rows = floor(height / resolution);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(resolution);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.setDirection(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDirection(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDirection(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.setDirection(-1, 0);
  }
}

function draw() {
  background(75);

  if (snake.eat(food)) {
    foodLocation();
  }

  snake.update();
  snake.show();

  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, resolution, resolution);
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(width / 2), floor(height / 2));
    this.xspeed = 0;
    this.yspeed = 0;
  }

  setDirection(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xspeed * resolution;
    head.y += this.yspeed * resolution;
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }

  endGame() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x > width - resolution || x < 0 || y > height - resolution || y < 0) {
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === x && part.y === y) {
        return true;
      }
    }
    return false;
  }

  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x === pos.x && y === pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, resolution, resolution);
    }
  }
}
