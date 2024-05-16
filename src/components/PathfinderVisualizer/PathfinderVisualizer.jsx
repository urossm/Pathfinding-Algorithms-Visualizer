/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { BiSolidGhost } from "react-icons/bi";
import { usePathfindingContext } from "../../context";
import { PriorityQueue, calcSpeed, detectCorners, directions, pause } from "../../utils";
import "./pathfindervisualizer.css";

function PathfinderVisualizer() {
	const [startingPosition, setStartinPosition] = useState([6, 10]);
	const [goalPosition, setGoalPosition] = useState([43, 10]);
	const [startSelected, setStartSelected] = useState(false);
	const [goalSelected, setGoalSelected] = useState(false);
	const {
		rows,
		cols,
		walls,
		setWalls,
		path,
		setPath,
		searchedPath,
		setSearchedPath,
		speed,
		selectedAlgorithm,
		pathfindingInProgress,
		setPathfindingInProgress,
		isFound,
		setIsFound,
		currentIndices,
		setCurrentIndices,
	} = usePathfindingContext();

	useEffect(() => {}, []);

	useEffect(() => {
		let isMounted = true;

		const find = async () => {
			switch (selectedAlgorithm) {
				case 0:
					await dijkstras();
					break;
				case 1:
					await astar();
					break;
				case 2:
					await bfs();
					break;
				case 3:
					await dfs();
					break;
				default:
					break;
			}
			cleanUpSort();
		};

		if (pathfindingInProgress && !isFound) {
			find();
		}

		return () => {
			isMounted = false;
		};
	}, [pathfindingInProgress]);

	const dijkstras = async () => {
		const distances = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
		const previous = Array.from({ length: rows }, () => Array(cols).fill(null));

		const pq = new PriorityQueue();

		distances[startingPosition[1]][startingPosition[0]] = 0;
		pq.enqueue(startingPosition, 0);

		const wallsSet = new Set(walls.map(([x, y]) => `${x},${y}`));

		while (!pq.isEmpty()) {
			const [x, y] = pq.dequeue();

			if (x === goalPosition[0] && y === goalPosition[1]) {
				const path = [];
				let curr = goalPosition;
				while (curr) {
					path.unshift(curr);
					curr = previous[curr[1]][curr[0]];
				}
				setPath(path);
				setIsFound(true);
				return path;
			}

			for (const [dx, dy] of directions) {
				const nx = x + dx;
				const ny = y + dy;

				if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && !wallsSet.has(`${nx},${ny}`)) {
					const newDist = distances[y][x] + 1;
					if (newDist < distances[ny][nx]) {
						distances[ny][nx] = newDist;
						previous[ny][nx] = [x, y];
						pq.enqueue([nx, ny], newDist);

						setCurrentIndices([nx, ny]);
						setSearchedPath((prevPath) => [...prevPath, [nx, ny]]);
						await pause(calcSpeed(speed));
					}
				}
			}
		}
		setIsFound(false);
	};

	const astar = async () => {
		// TODO: implement A* algorithm here
	};

	const bfs = async () => {
		// TODO: implement bfs algorithm here
	};

	const dfs = async () => {
		// TODO: implement dfs algorithm here
	};

	const cleanUpSort = () => {
		setPathfindingInProgress(false);
	};

	const handleGridClick = (x, y) => {
		if (pathfindingInProgress || searchedPath.length > 0) {
			return null;
		} else if (x == startingPosition[0] && y == startingPosition[1]) {
			setStartSelected(true);
		} else if (x == goalPosition[0] && y == goalPosition[1]) {
			setGoalSelected(true);
		} else if (startSelected) {
			setStartinPosition([x, y]);
			setStartSelected(false);
		} else if (goalSelected) {
			setGoalPosition([x, y]);
			setGoalSelected(false);
		} else {
			const index = walls.findIndex((coord) => coord[0] == x && coord[1] == y);
			if (index === -1) {
				setWalls([...walls, [x, y]]);
			} else {
				const updatedWalls = walls.filter((coord) => !(coord[0] == x && coord[1] == y));
				setWalls(updatedWalls);
			}
		}
	};

	const generateWall = (x, y) => {
		const { corners, borders } = detectCorners(x, y, walls);

		return (
			<div
				style={{
					borderRadius: `${corners[0]} ${corners[1]} ${corners[2]} ${corners[3]}`,
					borderTopWidth: borders[0],
					borderRightWidth: borders[1],
					borderBottomWidth: borders[2],
					borderLeftWidth: borders[3],
				}}
				className={`wall`}
			></div>
		);
	};

	const renderGridElement = (x, y) => {
		if (startingPosition[0] == x && startingPosition[1] == y) {
			return (
				<div className={`pacman ${startSelected && "picked-up"}`}>
					<div className="pacman-mouth"></div>
				</div>
			);
		} else if (goalPosition[0] == x && goalPosition[1] == y) {
			return <BiSolidGhost className={`ghost ${goalSelected && "picked-up"}`} color="red" size="2rem" />;
		} else if (walls.find((coord) => coord[0] == x && coord[1] == y)) {
			return generateWall(x, y);
		} else if (path.find((coords) => coords[0] == x && coords[1] == y)) {
			return <div className="path-dot"></div>;
		}
	};

	const topMessage = () => {
		if (pathfindingInProgress) return <div className="top-message">Pacman is searching. Please wait...</div>;
		else if (isFound) return <div className="top-message">Ghost has been found! Clear the board and try again</div>;
		else if (searchedPath.length == 0 && !pathfindingInProgress)
			return <div className="top-message">Click on any square to add or remove wall or click on characters to move them</div>;
		else if (searchedPath.length > 0 && !pathfindingInProgress && !isFound)
			return <div className="top-message">Ghost has not been found :( Clear the board and try again</div>;
	};

	const gridClass = (x, y) => {
		if (currentIndices != null && !isFound && currentIndices[0] == x && currentIndices[1] == y) {
			return "searching";
		} else if (path.find((coords) => coords[0] == x && coords[1] == y)) {
			return "path";
		} else if (searchedPath.find((coords) => coords[0] == x && coords[1] == y)) {
			return "found";
		}
	};

	const generateGrid = () => {
		const grid = [];
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				grid.push(
					<div id={`${[x, y]}`} key={`${[x, y]}`} className={`grid-square ${gridClass(x, y)}`} onClick={() => handleGridClick(x, y)}>
						{renderGridElement(x, y)}
					</div>
				);
			}
		}
		return grid;
	};

	return (
		<div className="grid-container" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
			{topMessage()}
			{generateGrid()}
		</div>
	);
}

export default PathfinderVisualizer;
