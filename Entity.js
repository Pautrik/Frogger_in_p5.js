function Entity(type) {
	this.x = -448;
	this.y = -32;
	this.size
	this.deadly
	this.speed
	this.sprite = entitySprites[type];

	if (type < 5) {
		this.deadly = true;
		this.y = (13 - type) * 32;
		switch (type) {
			case 0:
				this.speed = -28 / 75;
				this.size = 1;
				break;
			case 1:
				this.speed = 28 / 75;
				this.size = 1;
				break;
			case 2:
				this.speed = -42 / 75;
				this.size = 1;
				break;
			case 3:
				this.speed = 56 / 75;
				this.size = 1;
				break;
			case 4:
				this.speed = -14 / 15;
				this.size = 2;
		}
	} else {
		this.deadly = false;
		switch (type) {
			case 5:
				this.speed = -14 / 15;
				this.size = 3;
				this.y = 7 * 32;
				break;
			case 6:
				this.speed = -14 / 15;
				this.size = 3;
				this.y = 7 * 32;
				break;
			case 7:
				this.speed = 28 / 75;
				this.size = 2;
				this.y = 6 * 32;
				break;
			case 8:
				this.speed = 112 / 75;
				this.size = 5;
				this.y = 5 * 32;
				break;
			case 9:
				this.speed = -14 / 15;
				this.size = 2;
				this.y = 4 * 32;
				break;
			case 10:
				this.speed = 56 / 75;
				this.size = 3;
				this.y = 3 * 32;
		}
	}
}

function entityUpdater() {
	var counter = 0;
	entities.forEach(function (currEnt) {
		image(currEnt.sprite, currEnt.x, currEnt.y);
		currEnt.x += currEnt.speed;
		if (currEnt.speed > 0) {
			if (currEnt.x > 448) {
				currEnt.x = -currEnt.size * 32;
			}
		} else {
			if (currEnt.x < -currEnt.size * 32) {
				currEnt.x = 448;
			}
		}
	}, this);
}

function entitySetup() {
	for (var i = 0; i < 3; i++) {
		entities[i] = new Entity(0);
		entities[i].x = 160 + 144 * i;
		entities[i + 3] = new Entity(1);
		entities[i + 3].x = 192 + 128 * i;
		entities[i + 6] = new Entity(2);
		entities[i + 6].x = 192 + 128 * i;
		entities[i + 16] = new Entity(7);
		entities[i + 16].x = 80 + 160 * i;
		entities[i + 25] = new Entity(10);
		entities[i + 25].x = 16 + 176 * i;
	}
	entities[9] = new Entity(3);
	entities[9].x = 0;

	entities[10] = new Entity(4);
	entities[10].x = 240;
	entities[11] = new Entity(4);
	entities[11].x = 416;

	entities[19] = new Entity(8);
	entities[19].x = -192;
	entities[20] = new Entity(8);
	entities[20].x = -192 + 256;

	for (var j = 0; j < 4; j++) {
		entities[j + 12] = new Entity(5);
		entities[j + 12].x = 128 * j;
		entities[j + 21] = new Entity(9);
		entities[j + 21].x = 80 + 112 * j;
	}
}

function entityReset() {
	frog.x = 208;
	frog.y = 448;
	timeBarWidth = 256;
}

function winCheck() {
	var allSaved = baySpots.every(function (curr) { return curr; });
	if (allSaved) {
		score += 1000;
		setTimeout(function () {
			winFlag = true;
		}, 20);
	}
}

function lostCheck() {
	if (frog.lives === 0) {
		setTimeout(function() {
			lostFlag = true;
		}, 20);
	}
}

function entityInteraction() {
	var frogCenterX = frog.x + 16;
	var frogCenterY = frog.y + 16;
	if (frog.y >= height / 2) {
		for (var entIndex = 0; entIndex < 12; entIndex++) {
			var entCenterX = entities[entIndex].x + entities[entIndex].size * 32 / 2;
			var entCenterY = entities[entIndex].y + 16;

			if (abs(frogCenterX - entCenterX) < entities[entIndex].size * 32 / 2 && abs(frogCenterY - entCenterY) < 16) {
				frog.dying();
			}
		}
	} else {
		var connectFlag = false;
		for (var entIndex = 12; entIndex < 28; entIndex++) {
			var entCenterX = entities[entIndex].x + entities[entIndex].size * 32 / 2;
			var entCenterY = entities[entIndex].y + 16;

			if (abs(frogCenterX - entCenterX) < entities[entIndex].size * 32 / 2 && abs(frogCenterY - entCenterY) < 32) {
				connectFlag = true;
				frog.x += entities[entIndex].speed;
			}

			if (!savedFlag) {
				for (var bayspot = 0; bayspot < 5; bayspot++) {
					if (frogCenterX > 14 + bayspot * 96 && frogCenterX < 50 + bayspot * 96 && frogCenterY < 98) {
						for (var i = 4; i >= 0; i--)
							if (frog.x > 96 * i - 2) {
								if (baySpots[i])
									connectFlag = false;
								else {
									savedFlag = true;
									connectFlag = true;
									baySpots[i] = true;
									score += 50;
								}
								break;
							}
					}
				}
			}

		}
		if (!connectFlag)
			frog.dying();
	}
}
