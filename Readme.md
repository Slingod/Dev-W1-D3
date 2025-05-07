# 🛡️ RPG Free-for-All - JavaScript Game

Bienvenue dans **RPG Free-for-All**, un jeu de rôle en JavaScript jouable dans le **navigateur** ou directement dans le **terminal** ! Incarnez un héros, affrontez d'autres classes uniques, et devenez le dernier survivant.

## 🎮 Fonctionnalités

- 7 classes jouables : `Fighter`, `Paladin`, `Monk`, `Berzerker`, `Assassin`, `Wizard`, `Ranger`
- Système de tours (max 10)
- Attaques normales et attaques spéciales
- Mode visuel (HTML/CSS) et mode console (Node.js)
- Chaque classe possède une image personnalisée
- Affichage clair des PV, mana, actions, et morts en combat

---

## 📁 Structure du projet

```
D3/
├── images/          # Images des personnages
├── js/              # Code JavaScript (classes, logique, terminal)
│   ├── main.js           # Lancement du jeu en mode navigateur
│   ├── terminalGame.js   # Lancement du jeu en mode console
│   ├── utils.js          # Fonctions utilitaires (log, gameOver)
│   └── [Classe].js       # Fichiers pour chaque classe
├── index.html       # Interface web du jeu
└── style.css        # Style CSS de l'interface
```

---

## 🚀 Comment jouer

### ▶️ Jouer dans le navigateur

1. Clone le projet :

```bash
git clone git@github.com:Slingod/Dev-W1-D3.git
cd rpg-free-for-all
```

2. Ouvre le fichier `index.html` dans ton navigateur préféré (par double-clic ou via un serveur local comme Live Server).

3. Entre ton nom, choisis une classe, et commence la bataille !

---

### 💻 Jouer dans le terminal (Node.js)

1. Assure-toi d'avoir **Node.js** installé (v18 ou plus recommandé).

2. Lance le jeu :

```bash
cd js
node terminalGame.js
```

3. Suis les instructions pour choisir ta classe, ta cible, et attaquer !

---

## 📸 Aperçu

> (Ajoute ici une capture d'écran du jeu dans le navigateur)

---

## 🧩 Auteurs et contribution

Projet réalisé dans le cadre du bootcamp **The Hacking Project**.

Tu peux contribuer en ouvrant une issue ou une pull request !

---

## 📜 Licence

Ce projet est open-source, sous licence MIT.
