import "./algo.css";
import { delay, clearPath } from "./algo";

const BFSAlgo = async (startRow, startCol, endRow, endCol) => {
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

    document.getElementById(`${[X, Y]}`).classList.add("visited");
    if (currentX === parseInt(endRow) && currentY === parseInt(endCol)) {
      break;
    }
    await delay(1);

    for (let i = 0; i < 4; i++) {
      let neighborX = currentX + dirRow[i];
      let neighborY = currentY + dirCol[i];
      if (neighborX < 0 || neighborY < 0 || neighborX > 19 || neighborY > 49) {
        continue;
      }
      if (
        document
          .getElementById(`${[neighborX, neighborY]}`)
          .classList.contains("wall")
      ) {
        continue;
      }
      if (visited[neighborX][neighborY] === true) continue;
      visited[neighborX][neighborY] = true;
      parentX[neighborX][neighborY] = currentX;
      parentY[neighborX][neighborY] = currentY;
      x.push(neighborX);
      y.push(neighborY);
    }
  }
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
    document.getElementById(`${[currentX, currentY]}`).classList.add("path");
    await delay(30);
  }
};

export default BFSAlgo;
