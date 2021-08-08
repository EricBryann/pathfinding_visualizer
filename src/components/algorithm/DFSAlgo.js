import "./algo.css";
import { clearPath, delay } from "./algo";

const DFSAlgo = async (startRow, startCol, endRow, endCol) => {
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
    document.getElementById(`${[X, Y]}`).classList.add("visited");
    await delay(1);
    const dirRow = [-1, 0, 1, 0];
    const dirCol = [0, 1, 0, -1];
    for (let i = 0; i < 4; i++) {
      if (found) return;
      let neighborX = startRow + dirRow[i];
      let neighborY = startCol + dirCol[i];
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
      if (visited[neighborX][neighborY]) continue;
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
    await delay(30);
  }
  return true;
};

export default DFSAlgo;
