import React, { useState, useRef } from "react";
import Node from "./Node";
import BFSAlgo from "./BFSAlgo";
import DFSAlgo from "./DFSAlgo";
import "./PathFinding.css";
import Header from "../components/Header";
import Item from "../components/Item";
import { FiTarget } from "react-icons/fi";
import { AiFillDownCircle } from "react-icons/ai";

function PathFinding() {
  const [algoChoice, setAlgoChoice] = useState("BFS");
  const startRow = useRef(8);
  const startCol = useRef(14);
  const endRow = useRef(8);
  const endCol = useRef(35);
  let grid = [];
  let prevX = 100;
  let prevY = 100;
  var flag = 0;

  const clickHandler = (event) => {
    const coord = event.target.id;
    if (!coord) return;
    if (document.getElementById(`${coord}`).classList.contains("wall")) {
      document.getElementById(`${coord}`).classList.remove("wall");
    } else document.getElementById(`${coord}`).classList.add("wall");
  };

  const clickVisualizeHandler = () => {
    switch (algoChoice) {
      case "BFS":
        return BFSAlgo(
          startRow.current,
          startCol.current,
          endRow.current,
          endCol.current
        );
      case "DFS":
        return DFSAlgo(
          startRow.current,
          startCol.current,
          endRow.current,
          endCol.current
        );
      default:
        return;
    }
  };

  const onItemDragStart = (e) => {
    flag = 1;
    const target = e.target;
    console.log("z");

    e.dataTransfer.setData("item_id", target.id);

    setTimeout(() => {
      target.style.display = "none";
    }, 0);
  };

  const onItemDragOver = (e) => {
    console.log("Hi");
    e.stopPropagation();
  };

  const onDragOver = (event) => {
    event.preventDefault();
    if (flag === 1) return;
    const coord = event.target.id.split(",");
    if (
      (coord[0] === prevX && coord[1] === prevY) ||
      (coord[0] === startRow && coord[1] === startCol) ||
      (coord[0] === endRow && coord[1] === endCol)
    ) {
      return;
    }
    prevX = coord[0];
    prevY = coord[1];
    if (document.getElementById(`${coord}`).classList.contains("wall")) {
      document.getElementById(`${coord}`).classList.remove("wall");
    } else document.getElementById(`${coord}`).classList.add("wall");

    document.getElementById(`${coord}`).classList.remove("path");
    document.getElementById(`${coord}`).classList.remove("visited");
  };

  const onDrop = (e) => {
    flag = 0;
    e.preventDefault();
    const item_id = e.dataTransfer.getData("item_id");

    if (!item_id) {
      return;
    }
    const coord = e.target.id.split(",");
    if (item_id === "start") {
      startRow.current = parseInt(coord[0]);
      startCol.current = parseInt(coord[1]);
    } else {
      endRow.current = parseInt(coord[0]);
      endCol.current = parseInt(coord[1]);
    }
    document.getElementById(`${[coord[0], coord[1]]}`).classList.remove("wall");
    const item = document.getElementById(item_id);
    item.style.display = "block";

    e.target.appendChild(item);
  };

  const restart = () => {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 50; j++) {
        document.getElementById(`${[i, j]}`).classList.remove("wall");
        document.getElementById(`${[i, j]}`).classList.remove("path");
        document.getElementById(`${[i, j]}`).classList.remove("visited");
      }
    }
  };

  for (let i = 0; i < 20; i++) {
    let newGrid = [];
    for (let j = 0; j < 50; j++) {
      if (i === 8 && j === 35) {
        newGrid.push(
          <Node
            key={`${i}-${j}`}
            id={`${[i, j]}`}
            onClick={clickHandler}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Item
              id="end"
              onDragStart={onItemDragStart}
              onDragOver={onItemDragOver}
            >
              <FiTarget size={23} />
            </Item>
          </Node>
        );
      } else if (i === 8 && j === 14) {
        newGrid.push(
          <Node
            key={`${i}-${j}`}
            id={`${[i, j]}`}
            onClick={clickHandler}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Item
              id="start"
              onDragStart={onItemDragStart}
              onDragOver={onItemDragOver}
            >
              <AiFillDownCircle size={23} />
            </Item>
          </Node>
        );
      } else {
        newGrid.push(
          <Node
            key={`${i}-${j}`}
            id={`${[i, j]}`}
            onClick={clickHandler}
            className="node"
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        );
      }
    }
    grid.push(
      <div key={i} className="no-space">
        {newGrid}
      </div>
    );
  }

  return (
    <div className="nowrap">
      <Header
        algoChoice={algoChoice}
        setAlgoChoice={setAlgoChoice}
        onClickClearPath={restart}
        onClickVisualize={clickVisualizeHandler}
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
      {grid}
    </div>
  );
}

export default PathFinding;
