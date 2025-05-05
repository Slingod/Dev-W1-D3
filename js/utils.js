export function log(message) {
    const logDiv = document.getElementById("game-log");
    logDiv.innerHTML += `<p>${message}</p>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  }
  
  export function gameOver(loserName) {
    const actions = document.getElementById("actions");
    const gameLog = document.getElementById("game-log");
    actions.innerHTML = ''; // désactive les boutons
    gameLog.innerHTML += `<h2>💀 ${loserName} est mort. GAME OVER 💀</h2>`;
  
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "🔁 Rejouer";
    restartBtn.addEventListener("click", () => {
      location.reload(); // recharge toute la page
    });
    actions.appendChild(restartBtn);
  }
    // Fonction pour réinitialiser le jeu  
    export function resetGame() {
        const logDiv = document.getElementById("game-log");
        logDiv.innerHTML = '';
        const actions = document.getElementById("actions");
        actions.innerHTML = `
        <button id="btn-attack">Attaquer</button>
        <button id="btn-spell">Lancer un sort</button>
        `;
    }  