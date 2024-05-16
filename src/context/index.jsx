/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from "react";
import { defaultWalls } from "../utils";

const PathfindingContext = createContext();

export const usePathfindingContext = () => useContext(PathfindingContext);

export const PathfindingProvider = ({ children }) => {
	const [cols] = useState(50);
	const [rows] = useState(21);
	const [walls, setWalls] = useState(defaultWalls);
	const [path, setPath] = useState([]);
	const [searchedPath, setSearchedPath] = useState([]);
	const [currentIndices, setCurrentIndices] = useState(null);
	const [speed, setSpeed] = useState(100);
	const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
	const [pathfindingInProgress, setPathfindingInProgress] = useState(false);
	const [isFound, setIsFound] = useState(false);

	const values = {
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
	};

	return <PathfindingContext.Provider value={values}>{children}</PathfindingContext.Provider>;
};
