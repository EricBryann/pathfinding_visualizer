import React from "react";
import Node from "./Node";
import "./PathFinding.css";
import Header from "../components/Header";
import { FiTarget } from "react-icons/fi";
import { AiFillDownCircle } from "react-icons/ai";
import usePathFinding from "./usePathFinding";

function PathFinding() {
  const {
    algoChoice,
    setAlgoChoice,
    restart,
    clickVisualizeHandler,
    error,
    grid,
    isAlgoRunning,
  } = usePathFinding();

  return (
    <div className="nowrap">
      <Header
        algoChoice={algoChoice}
        setAlgoChoice={setAlgoChoice}
        onClickClearPath={isAlgoRunning ? null : restart}
        onClickVisualize={isAlgoRunning ? null : clickVisualizeHandler}
      />
      <div className="instructions">
        <div className="sub-instruction">
          <AiFillDownCircle size={23} />
          <div className="word">Drag to change start point</div>
        </div>
        <div className="sub-instruction">
          <FiTarget size={23} />
          <div className="word">Drag to change end point</div>
        </div>
        <div className="sub-instruction">
          <Node className="" />
          <div className="word">Drag to toggle walls</div>
        </div>
        <div className="sub-instruction">
          <Node className="instruction-node-visited" />
          <div className="word">Node visited</div>
        </div>
        <div className="sub-instruction">
          <Node className="instruction-node-goal" />
          <div className="word">Path to end point</div>
        </div>
      </div>
      <div className="error">
        <p>{error}</p>
      </div>
      {grid}
    </div>
  );
}

export default PathFinding;
