export const hasWall = (coord) => {
  return document.getElementById(`${coord}`).classList.contains("wall");
};

export const removeWall = (coord) => {
  document.getElementById(`${coord}`).classList.remove("wall");
};

export const removePath = (coord) => {
  document.getElementById(`${coord}`).classList.remove("path");
};

export const removeVisitedPath = (coord) => {
  document.getElementById(`${coord}`).classList.remove("visited");
};

export const addWall = (coord) => {
  document.getElementById(`${coord}`).classList.add("wall");
};

export const getCoordFromId = (id) => {
  return id.split(",");
};
