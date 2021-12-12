import "./algo.css";
import { clearPath, delay } from "./algo";
import { addVisitedPath, hasWall } from "../util";

const isOutOfBound = (X, Y) => {
  return X < 0 || Y < 0 || X > 19 || Y > 49;
};

const DFSAlgo = async (startRow, startCol, endRow, endCol, delayTime) => {
  clearPath();
  let visited = [];
  let parentX = [];
  let parentY = [];

  for (let i = 0; i < 20; i++) {
    let a = [];
    let b = [];
    let c = [];
    for (let j = 0; j < 50; j++) {
      a.push(false);
      b.push(i);
      c.push(j);
    }
    visited.push(a);
    parentX.push(b);
    parentY.push(c);
  }
  let found = false;

  const DFS = async (startRow, startCol, endRow, endCol) => {
    if (startRow === endRow && startCol === endCol) found = true;
    if (visited[startRow][startCol]) return;
    visited[startRow][startCol] = true;

    let X = parseInt(startRow);
    let Y = parseInt(startCol);
    const currentCoord = [X, Y];
    addVisitedPath(currentCoord);

    await delay(1);

    const dirRow = [-1, 0, 1, 0];
    const dirCol = [0, 1, 0, -1];
    for (let i = 0; i < 4; i++) {
      if (found) return;
      let neighborX = startRow + dirRow[i];
      let neighborY = startCol + dirCol[i];
      if (
        isOutOfBound(neighborX, neighborY) ||
        hasWall(neighborX, neighborY) ||
        visited[neighborX][neighborY]
      ) {
        continue;
      }

      parentX[neighborX][neighborY] = startRow;
      parentY[neighborX][neighborY] = startCol;
      await DFS(neighborX, neighborY, endRow, endCol);
    }
  };

  await DFS(startRow, startCol, endRow, endCol);
  if (!found) return false;

  let pathX = [];
  let pathY = [];
  let row = endRow;
  let col = endCol;

  while (endRow !== parseInt(startRow) || endCol !== parseInt(startCol)) {
    let a = endRow;
    let b = endCol;
    endRow = parentX[endRow][endCol];
    endCol = parentY[a][b];
    pathX.unshift(endRow);
    pathY.unshift(endCol);
  }

  pathX.push(row);
  pathY.push(col);
  while (pathX.length !== 0) {
    let endRow = pathX.shift();
    let endCol = pathY.shift();
    document.getElementById(`${[endRow, endCol]}`).classList.add("path");
    await delay(delayTime);
  }
  return true;
};

export default DFSAlgo;
