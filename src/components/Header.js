import React from "react";
import Button from "../UIElements/Button";
import "./Header.css";

function Header({ onClickAlgo, onClickClearPath, onClickVisualize }) {
  return (
    <div className="header-class">
      <div className="title">PathFinding Visualizer</div>
      <div className="button-class">
        <Button onClick={onClickAlgo}>Algorithm</Button>
        <Button onClick={onClickVisualize}>Visualize</Button>
        <Button onClick={onClickClearPath}>Clear Path</Button>
      </div>
    </div>
  );
}

export default Header;
