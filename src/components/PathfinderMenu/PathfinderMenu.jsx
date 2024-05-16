/* eslint-disable no-unused-vars */
import { FaMapLocationDot, FaTrashCan } from "react-icons/fa6";
import { ImPacman } from "react-icons/im";
import { IoIosSpeedometer } from "react-icons/io";
import { usePathfindingContext } from "../../context";
import "./pathfindermenu.css";

function PathfinderMenu() {
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
		setSpeed,
		selectedAlgorithm,
		setSelectedAlgorithm,
		pathfindingInProgress,
		setPathfindingInProgress,
		isFound,
		setIsFound,
		currentIndices,
		setCurrentIndices,
	} = usePathfindingContext();
	const iconSize = "1rem";

	const handleAlgorithmChange = (event) => {
		if (!pathfindingInProgress) {
			if (isFound) {
				setWalls([]);
			}
			setSelectedAlgorithm(parseInt(event.target.value));
			setIsFound(false);
			setCurrentIndices([]);
			setPath([]);
			setSearchedPath([]);
		}
	};

	const handleSpeedChange = (event) => {
		if (!pathfindingInProgress) {
			setSpeed(event.target.value);
			setIsFound(false);
			setCurrentIndices([]);
			setPath([]);
			setSearchedPath([]);
		}
	};

	const handleClearBoard = () => {
		if (!pathfindingInProgress) {
			setWalls([]);
			setIsFound(false);
			setCurrentIndices([]);
			setPath([]);
			setSearchedPath([]);
		}
	};

	return (
		<>
			<div className="menu">
				<div className="flex-row a-items-center j-content-center gap1">
					<div className="flex-row a-items-center j-content-center gap05">
						<FaMapLocationDot size={iconSize} />
						Pathfinding Algorithm:
					</div>
					<select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
						<option value={0}>Dijkstra&apos;s Algorithm</option>
						{/* <option value={1}>A* Search Algorithm</option>
						<option value={2}>Breadth-First Search (BFS)</option>
						<option value={3}>Depth-First Search (DFS)</option> */}
					</select>
				</div>
				<div className="divider"></div>
				<div className="flex-row a-items-center j-content-center gap05">
					<IoIosSpeedometer size={iconSize} /> Speed:
					<input className="slider" type="range" min="1" max="100" value={speed} onChange={handleSpeedChange} />
				</div>
				<div className="divider"></div>
				<div className="flex-row a-items-center j-content-center gap1">
					<button onClick={() => handleClearBoard()}>
						<FaTrashCan size={iconSize} />
						Clear Board
					</button>
					<button
						onClick={() => {
							!isFound && setPathfindingInProgress(true);
						}}
					>
						<ImPacman size={iconSize} />
						Run Simulation
					</button>
				</div>
			</div>
		</>
	);
}

export default PathfinderMenu;
