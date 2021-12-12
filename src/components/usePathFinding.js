import React, { useState, useRef } from "react";
import BFSAlgo from "./algorithm/BFSAlgo";
import DFSAlgo from "./algorithm/DFSAlgo";
import Item from "../components/Item";
import Node from "./Node";
import { FiTarget } from "react-icons/fi";
import { AiFillDownCircle } from "react-icons/ai";
import { DELAY_TIME } from "./algorithm/constants";

export default function usePathFinding() {
  const [algoChoice, setAlgoChoice] = useState("BFS");
  const [error, setError] = useState("");
  const [isAlgoRunning, setIsAlgoRunning] = useState(false);
  const startRow = useRef(8);
  const startCol = useRef(14);
  const endRow = useRef(8);
  const endCol = useRef(35);
  let grid = [];
  let prevX = 100;
  let prevY = 100;
  var flag = 0;

  const hasWall = (coord) => {
    return document.getElementById(`${coord}`).classList.contains("wall");
  };

  const removeWall = (coord) => {
    document.getElementById(`${coord}`).classList.remove("wall");
  };

  const removePath = (coord) => {
    document.getElementById(`${coord}`).classList.remove("path");
  };

  const removeVisitedPath = (coord) => {
    document.getElementById(`${coord}`).classList.remove("visited");
  };

  const addWall = (coord) => {
    document.getElementById(`${coord}`).classList.add("wall");
  };

  const isOccupied = (coord) => {
    return (
      (coord[0] === prevX && coord[1] === prevY) ||
      (coord[0] === startRow && coord[1] === startCol) ||
      (coord[0] === endRow && coord[1] === endCol)
    );
  };

  const getCoordFromId = (id) => {
    return id.split(",");
  };

  const clickHandler = (event) => {
    const coord = event.target.id;
    if (!coord) return;

    if (hasWall(coord)) {
      removeWall(coord);
    } else {
      addWall(coord);
    }
  };

  const clickVisualizeHandler = async () => {
    setIsAlgoRunning(true);
    setError("");
    let hasPath;

    const runAlgo = async (algo) => {
      return await algo(
        startRow.current,
        startCol.current,
        endRow.current,
        endCol.current,
        DELAY_TIME
      );
    };

    switch (algoChoice) {
      case "BFS":
        hasPath = await runAlgo(BFSAlgo);
        if (!hasPath) setError("No path found!");
        break;
      case "DFS":
        hasPath = await runAlgo(DFSAlgo);
        if (!hasPath) setError("No path found!");
        break;
      default:
        break;
    }

    setIsAlgoRunning(false);
  };

  const onItemDragStart = (e) => {
    flag = 1;
    const target = e.target;

    e.dataTransfer.setData("item_id", target.id);

    setTimeout(() => {
      target.style.display = "none";
    }, 0);
  };

  const onItemDragOver = (e) => {
    e.stopPropagation();
  };

  const onDragOver = (event) => {
    event.preventDefault();
    if (flag === 1) return;
    const coord = getCoordFromId(event.target.id);

    if (isOccupied(coord)) {
      return;
    }

    prevX = coord[0];
    prevY = coord[1];

    if (hasWall(coord)) {
      removeWall(coord);
    } else {
      addWall(coord);
    }

    removePath(coord);
    removeVisitedPath(coord);
  };

  const onDrop = (event) => {
    flag = 0;
    event.preventDefault();
    const item_id = event.dataTransfer.getData("item_id");

    if (!item_id) {
      return;
    }
    const coord = getCoordFromId(event.target.id);
    if (item_id === "start") {
      startRow.current = parseInt(coord[0]);
      startCol.current = parseInt(coord[1]);
    } else {
      endRow.current = parseInt(coord[0]);
      endCol.current = parseInt(coord[1]);
    }

    removeWall(coord);
    const item = document.getElementById(item_id);
    item.style.display = "block";

    event.target.appendChild(item);
  };

  const restart = () => {
    setError("");
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 50; j++) {
        const currentCoord = [i, j];
        removeWall(currentCoord);
        removePath(currentCoord);
        removeVisitedPath(currentCoord);
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
  return {
    algoChoice,
    setAlgoChoice,
    restart,
    clickVisualizeHandler,
    error,
    grid,
    isAlgoRunning,
  };
}
