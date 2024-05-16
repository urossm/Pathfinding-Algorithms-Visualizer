import React from "react";
import ReactDOM from "react-dom/client";
import PathfinderMenu from "./components/PathfinderMenu/PathfinderMenu";
import PathfinderVisualizer from "./components/PathfinderVisualizer/PathfinderVisualizer";
import { PathfindingProvider } from "./context";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<PathfindingProvider>
			<div className="container">
				<div className="container-inner">
					<PathfinderMenu />
					<PathfinderVisualizer />
				</div>
			</div>
		</PathfindingProvider>
	</React.StrictMode>
);
