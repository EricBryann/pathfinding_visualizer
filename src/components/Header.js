import React from "react";
import Button from "../UIElements/Button";
import "./Header.css";

function Header({ setAlgoChoice, onClickClearPath, onClickVisualize }) {
  return (
    <div className="header-class">
      <div className="title">PathFinding Visualizer</div>
      <div className="algo">
        <label className="algo-label">Choose Algorithm</label>
        <select
          className="select"
          onChange={(e) => setAlgoChoice(e.target.value)}
        >
          <option value="BFS">BFS</option>
          <option value="DFS">DFS</option>
        </select>
      </div>
      <div className="button-class">
        <Button onClick={onClickVisualize}>Visualize</Button>
        <Button onClick={onClickClearPath}>Clear Path</Button>
      </div>
    </div>
  );
}

export default Header;
