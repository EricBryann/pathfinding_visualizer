import "./algo.css";
import { delay, clearPath } from "./algo";
import { addPath, addVisitedPath, hasWall } from "../util";

const isOutOfBound = (X, Y) => {
  return X < 0 || Y < 0 || X > 19 || Y > 49;
};

const hasFoundEndPoint = (currentX, currentY, endRow, endCol) => {
  return currentX === parseInt(endRow) && currentY === parseInt(endCol);
};

const BFSAlgo = async (startRow, startCol, endRow, endCol, delayTime) => {
  clearPath();

  const dirRow = [-1, 0, 1, 0];
  const dirCol = [0, 1, 0, -1];
  let x = [startRow];
  let y = [startCol];
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

  while (x.length > 0) {
    let X = x.shift();
    let Y = y.shift();
    var currentX = parseInt(X);
    var currentY = parseInt(Y);
    const currentCoord = [X, Y];
    addVisitedPath(currentCoord);

    if (hasFoundEndPoint(currentX, currentY, endRow, endCol)) {
      break;
    }
    await delay(1);
    for (let i = 0; i < 4; i++) {
      let neighborX = currentX + dirRow[i];
      let neighborY = currentY + dirCol[i];
      if (
        isOutOfBound(neighborX, neighborY) ||
        hasWall(neighborX, neighborY) ||
        visited[neighborX][neighborY]
      ) {
        continue;
      }

      visited[neighborX][neighborY] = true;
      parentX[neighborX][neighborY] = currentX;
      parentY[neighborX][neighborY] = currentY;
      x.push(neighborX);
      y.push(neighborY);
    }
  }

  if (!visited[endRow][endCol]) return false;
  let pathX = [];
  let pathY = [];
  while (currentX !== parseInt(startRow) || currentY !== parseInt(startCol)) {
    let a = currentX;
    let b = currentY;
    currentX = parentX[currentX][currentY];
    currentY = parentY[a][b];
    pathX.unshift(currentX);
    pathY.unshift(currentY);
  }
  pathX.push(endRow);
  pathY.push(endCol);
  while (pathX.length !== 0) {
    let currentX = pathX.shift();
    let currentY = pathY.shift();
    const currentCoord = [currentX, currentY];
    addPath(currentCoord);
    await delay(delayTime);
  }
  return true;
};

export default BFSAlgo;
