export const hasWall = (coord) => {
  return document.getElementById(`${coord}`).classList.contains("wall");
};

export const addWall = (coord) => {
  document.getElementById(`${coord}`).classList.add("wall");
};

export const removeWall = (coord) => {
  document.getElementById(`${coord}`).classList.remove("wall");
};

export const addPath = (coord) => {
  document.getElementById(`${coord}`).classList.add("path");
};

export const removePath = (coord) => {
  document.getElementById(`${coord}`).classList.remove("path");
};

export const addVisitedPath = (coord) => {
  document.getElementById(`${coord}`).classList.add("visited");
};

export const removeVisitedPath = (coord) => {
  document.getElementById(`${coord}`).classList.remove("visited");
};

export const getCoordFromId = (id) => {
  return id.split(",");
};
