/* eslint-disable no-unused-vars */
export const pause = (milliseconds) => {
	return new Promise((resolve) => {
		setTimeout(resolve, milliseconds);
	});
};

export const detectCorners = (x, y, walls) => {
	const corner = "50%";
	const border = "4px";
	const corners = [corner, corner, corner, corner];
	const borders = [border, border, border, border];

	const topWall = walls.find(([wallX, wallY]) => wallX == x && wallY == y - 1);
	const rightWall = walls.find(([wallX, wallY]) => wallX == x + 1 && wallY == y);
	const bottomWall = walls.find(([wallX, wallY]) => wallX == x && wallY == y + 1);
	const leftWall = walls.find(([wallX, wallY]) => wallX == x - 1 && wallY == y);

	if (topWall) {
		corners[0] = 0;
		corners[1] = 0;
		borders[0] = 0;
	}

	if (rightWall) {
		corners[1] = 0;
		corners[2] = 0;
		borders[1] = 0;
	}

	if (bottomWall) {
		corners[2] = 0;
		corners[3] = 0;
		borders[2] = 0;
	}

	if (leftWall) {
		corners[3] = 0;
		corners[0] = 0;
		borders[3] = 0;
	}

	return { corners, borders };
};

export class PriorityQueue {
	constructor() {
		this.elements = [];
	}

	enqueue(item, priority) {
		this.elements.push({ item, priority });
		this.elements.sort((a, b) => a.priority - b.priority);
	}

	dequeue() {
		return this.elements.shift().item;
	}

	isEmpty() {
		return this.elements.length === 0;
	}

	contains(item) {
		return this.elements.some((element) => element.item[0] === item[0] && element.item[1] === item[1]);
	}
}

export const calcSpeed = (speed) => {
	return 100 - speed;
};

export const heuristic = (a, b) => {
	return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

export const directions = [
	[0, 1], // right
	[1, 0], // down
	[0, -1], // left
	[-1, 0], // up
];

export const defaultWalls = [
	[24, 5],
	[24, 6],
	[24, 7],
	[24, 8],
	[24, 9],
	[24, 10],
	[24, 11],
	[24, 12],
	[24, 13],
	[24, 14],
	[24, 15],
	[24, 16],
	[44, 7],
	[43, 7],
	[42, 7],
	[41, 7],
	[39, 7],
	[40, 7],
	[38, 7],
	[38, 8],
	[38, 9],
	[38, 10],
	[38, 11],
	[38, 12],
	[38, 13],
	[43, 13],
	[42, 13],
	[41, 13],
	[39, 13],
	[40, 13],
	[41, 13],
	[44, 13],
];
