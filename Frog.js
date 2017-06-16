function Frog() {
	this.sprite = sitFrogSprites[0];
	this.x = 208;
	this.y = 448;
	this.jumpable = true;
	this.lives = 3;
	this.dead = false;
	this.reset = function() {
		this.lives = 3;
		this.jumpable = true;
		this.dead = false;
	};
	this.dying = function () {
		frog.dead = true;
		frog.lives--;
		setTimeout(function () {
			frog.dead = false;
			entityReset();
		}, 4000);
	}
	this.animate = function (direction, frogObj) {
		this.jumpable = false;
		this.sprite = jumpFrogSprites[direction];
		setTimeout(function () {
			frogObj.sprite = sitFrogSprites[direction];
			switch (direction) {
				case 0:
					frogObj.y -= 16;
					break;
				case 1:
					frogObj.x += 16;
					break;
				case 2:
					frogObj.y += 16;
					break;
				case 3:
					frogObj.x -= 16;
			}
			setTimeout(function () {
				if (frog.y < distToTop) {
					score += 10;
					distToTop = frog.y;
				}
				frogObj.jumpable = true;
			}, 65);
		}, 165);
	};
}