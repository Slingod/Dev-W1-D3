export function log(message) {
  const logDiv = document.getElementById("game-log");
  logDiv.innerHTML += `<p>${message}</p>`;
  logDiv.scrollTop = logDiv.scrollHeight;
}

export function gameOver(loserName) {
  const actions = document.getElementById("actions");
  const gameLog = document.getElementById("game-log");
  actions.style.display = 'none';
  gameLog.innerHTML += `<h2>💀 ${loserName} est KO ! GAME OVER 💀</h2>`;

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "🔁 Rejouer";
  restartBtn.addEventListener("click", () => {
    location.reload();
  });
  actions.parentElement.appendChild(restartBtn);
}