var canW = 448, canH = 512, timeBarWidth = 256;
var sitFrogSprites = [];
var jumpFrogSprites = [];
var entitySprites = [];
var entities = [];
var baySpots = [false, false, false, false, false];
var frog, flowerBed, hp, timeText, bungeeShade, grass, saved;
var savedFlag = false;
var winFlag = false;
var lostFlag = false; //Lost as in losing
var score = 0;
var distToTop = 448;

function setup() {
	createCanvas(canW, canH);

	enviromentSetup();
	entitySetup();

	frog = new Frog();
}

function draw() {
	if (winFlag) {
		baySpots.fill(false);
		drawWin();
	}
	else if (lostFlag) {
		baySpots.fill(false);
		drawLost();
	}
	else {
		if (!savedFlag) {
			if (!frog.dead) {
				drawAlive();
				timeBarWidth -= 16 / 225;
				if (timeBarWidth <= 0)
					frog.dying();
			} else {
				distToTop = 448;
				drawDead();
			}
		} else {
			distToTop = 448;
			drawSaved();
		}
	}
}

function enviromentSetup() {
	for (var i = 0; i < 4; i++) {
		sitFrogSprites[i] = loadImage("Sprites/sFrog" + i + ".png");
		jumpFrogSprites[i] = loadImage("Sprites/jFrog" + i + ".png");
	}

	for (var j = 0; j < 11; j++) {
		entitySprites[j] = loadImage("Sprites/entity" + j + ".png");
	}

	saved = loadImage("Sprites/FinishedFrog.png");
	flowerBed = loadImage("Sprites/Flowers.png");
	hp = loadImage("Sprites/HP.png");
	timeText = loadImage("Sprites/Time.png");
	grass = loadImage("Sprites/Grass.png");
}

function drawAlive() {
	rectMode(CORNER);
	background(0, 0, 66);
	fill(20);
	noStroke();
	//Road
	rect(0, canH / 2, canW, canH / 2);
	//Upper Flower Bed
	image(flowerBed, 0, canH / 2);
	//Lower Flower Bed
	image(flowerBed, 0, 0.875 * canH);
	//Grass
	image(grass, 0, 48);
	fill(255, 0, 0);
	textSize(27);
	textAlign(LEFT, TOP);
	text(intPad(score, 5), 52, 16, 100, 30);

	for (var i = 0; i < frog.lives; i++) {
		image(hp, i * 18, 480);
	}

	for (var j = 0; j < baySpots.length; j++) {
		if (baySpots[j])
			image(saved, 96 * j + 14, 64);
	}

	image(timeText, 384, 496);
	fill(33, 222, 0);
	entityUpdater();
	rect(384 - Math.ceil(timeBarWidth), 496, Math.ceil(timeBarWidth), 16);
	entityInteraction();
	winCheck();
	lostCheck();
	image(frog.sprite, frog.x, frog.y);
}

function drawDead() {
	rectMode(CENTER);
	fill(63, 63, 127);
	stroke(0);
	strokeWeight(4);
	rect(width / 2, height / 2, 18 / 28 * width, 1 / 2 * height);
	fill(255);
	textSize(30);
	//textFont(bungeeShade);
	textAlign(CENTER, CENTER);
	text("You died!", width / 2, height / 2, 18 / 28 * width, 1 / 2 * height);
}

function drawSaved() {
	rectMode(CENTER);
	fill(63, 63, 127);
	stroke(0);
	strokeWeight(4);
	rect(width / 2, height / 2, 18 / 28 * width, 1 / 2 * height);
	fill(255);
	textSize(30);
	//textFont(bungeeShade);
	textAlign(CENTER, CENTER);
	text("Frog Saved!", width / 2, height / 2, 18 / 28 * width, 1 / 2 * height);

	setTimeout(function () {
		entityReset();
		savedFlag = false
	}, 2000);
}

function drawWin() {
	score = 0;
	entityReset();
	frog.reset();
	rectMode(CENTER);
	fill(63, 63, 127);
	stroke(0);
	strokeWeight(4);
	rect(width / 2, height / 2, 18 / 28 * width, 1 / 2 * height);
	fill(255);
	textSize(30);
	textAlign(CENTER, CENTER);
	text("All Frogs Saved!", width / 2, height / 2, 18 / 28 * width, 1 / 2 * height);
	textSize(15);
	text("Press space to restart", width / 2, height * 0.61, 18 / 28 * width, 1 / 2 * height);
}
function drawLost() {
	score = 0;
	entityReset();
	frog.reset();
	rectMode(CENTER);
	fill(63, 63, 127);
	stroke(0);
	strokeWeight(4);
	rect(width / 2, height / 2, 18 / 28 * width, 1 / 2 * height);
	fill(255);
	textSize(30);
	textAlign(CENTER, CENTER);
	text("You lost!", width / 2, height / 2, 18 / 28 * width, 1 / 2 * height);
	textSize(15);
	text("Press space to restart", width / 2, height * 0.61, 18 / 28 * width, 1 / 2 * height);
}


function keyPressed() {
	if (frog.jumpable) {
		switch (keyCode) {
			case UP_ARROW:
				if (frog.y > 64) {
					frog.y -= 16;
					frog.animate(0, frog);
				}
				break;
			case RIGHT_ARROW:
				if (frog.x < 400) {
					frog.x += 16;
					frog.animate(1, frog);
				}
				break;
			case DOWN_ARROW:
				if (frog.y < 448) {
					frog.y += 16;
					frog.animate(2, frog);
				}
				break;
			case LEFT_ARROW:
				if (frog.x > 16) {
					frog.x -= 16;
					frog.animate(3, frog);
				}
				break;
			case 32:
				frog.reset();
				entityReset();
				winFlag = false;
				lostFlag = false;
		}
	}
}

function intPad(num, size) {
	var s = num + "";
	while (s.length < size) s = "0" + s;
	return s;
}