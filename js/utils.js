let isTerminal = typeof window === 'undefined';

export function log(message) {
  if (isTerminal) {
    console.log(message);
  } else {
    const logDiv = document.getElementById("game-log");
    logDiv.innerHTML += `<p>${message}</p>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  }
}

export function gameOver(name) {
  if (isTerminal) {
    console.log(`🎉 Fin du jeu. Gagnant : ${name}`);
    process.exit(0); // Termine le programme proprement
  } else {
    const actions = document.getElementById("actions");
    const gameLog = document.getElementById("game-log");
    actions.style.display = 'none';
    gameLog.innerHTML += `<h2>💀 ${name} est KO ! GAME OVER 💀</h2>`;

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "🔁 Rejouer";
    restartBtn.addEventListener("click", () => {
      location.reload();
    });
    actions.parentElement.appendChild(restartBtn);
  }
}