export function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayInms);
  });
}

export function clearPath() {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 50; j++) {
      document.getElementById(`${[i, j]}`).classList.remove("path");
      document.getElementById(`${[i, j]}`).classList.remove("visited");
    }
  }
}
