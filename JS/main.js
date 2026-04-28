// ====================== NULL_X V2.17 - MAIN.JS ======================

// Check if the page was opened in cloak mode
const urlParams = new URLSearchParams(window.location.search);
const isCloaked = urlParams.get('cloaked') === 'true';

if (isCloaked) {
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('boot-screen').classList.add('hidden');
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('main-screen').classList.remove('hidden');
        document.title = "Google Docs";
    });
}

const bootPhrases = [
    "INITIALIZING NULL_X CORE...",
    "BYPASSING LINEWISE FILTERS...",
    "LOADING GAME DATABASE...",
    "NULL_X V2.17 ONLINE"
];

let phraseIndex = 0;

function startBootSequence() {
    const greenTextEl = document.getElementById('green-text');
    if (!greenTextEl) return;
    greenTextEl.textContent = bootPhrases[phraseIndex];
    phraseIndex++;
    if (phraseIndex < bootPhrases.length) {
        setTimeout(startBootSequence, 750);
    } else {
        setTimeout(() => {
            document.getElementById('boot-screen').classList.add('hidden');
            document.getElementById('welcome-screen').classList.remove('hidden');
        }, 900);
    }
}

function activateCloak() {
    document.title = "Google Docs";
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainScreen = document.getElementById('main-screen');
    if (welcomeScreen) welcomeScreen.classList.add('hidden');
    if (mainScreen) mainScreen.classList.remove('hidden');

    const currentUrl = window.location.href;
    const newTab = window.open('about:blank', '_blank');

    if (newTab) {
        newTab.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Google Docs</title>
                <style>
                    body, html { margin:0; padding:0; height:100%; overflow:hidden; background:#0a0a0a; }
                    iframe { width:100vw; height:100vh; border:none; }
                </style>
            </head>
            <body>
                <iframe src="${currentUrl}?cloaked=true"></iframe>
            </body>
            </html>
        `);
        newTab.document.close();
        setTimeout(() => {
            try { window.close(); } catch(e) {}
        }, 400);
    } else {
        alert("Popup was blocked. Please allow popups for this site.");
    }
}

// Navigation for the three cards
function navigateTo(section) {
    if (section === 'games') {
        showGames();
    }
    else if (section === 'proxy') {
        showProxy();
    }
    else if (section === 'settings') {
        alert("⚙️ Settings section coming soon!");
    }
}

// ====================== PROXY SECTION ======================
function showProxy() {
    document.getElementById('main-screen').classList.add('hidden');
    let proxyContainer = document.getElementById('proxy-container');
   
    if (!proxyContainer) {
        proxyContainer = document.createElement('div');
        proxyContainer.id = 'proxy-container';
        proxyContainer.className = 'screen';
        proxyContainer.innerHTML = `
            <div style="position: absolute; top: 15px; left: 15px; z-index: 100;">
                <button onclick="backToMain()"
                        style="background: #111; color: #0f0; border: 2px solid #0f0; padding: 12px 20px; font-family: Courier New; font-size: 1rem; cursor: pointer;">
                    ← Back to Menu
                </button>
            </div>
            <iframe id="proxy-iframe"
                    src="https://p-nation.marine1.com.my"
                    style="width: 100vw; height: 100vh; border: none;"></iframe>
        `;
        document.body.appendChild(proxyContainer);
    } else {
        proxyContainer.classList.remove('hidden');
    }
}

function backToMain() {
    const proxyContainer = document.getElementById('proxy-container');
    if (proxyContainer) proxyContainer.classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
}

// ====================== GAMES SECTION ======================
function showGames() {
    document.getElementById('main-screen').classList.add('hidden');
    let gamesContainer = document.getElementById('games-container');
   
    if (!gamesContainer) {
        gamesContainer = document.createElement('div');
        gamesContainer.id = 'games-container';
        gamesContainer.className = 'screen';
        gamesContainer.innerHTML = `
            <div style="position: absolute; top: 15px; left: 15px; z-index: 100;">
                <button onclick="backToMainFromGames()"
                        style="background: #111; color: #0f0; border: 2px solid #0f0; padding: 12px 20px; font-family: Courier New; cursor: pointer;">
                    ← Back to Menu
                </button>
            </div>
            <div style="padding: 80px 20px; text-align: center;">
                <h2 style="color:#0f0; margin-bottom: 40px;">Games</h2>
                <div id="game-list" style="display: flex; flex-wrap: wrap; gap: 25px; justify-content: center;"></div>
            </div>
        `;
        document.body.appendChild(gamesContainer);
    } else {
        gamesContainer.classList.remove('hidden');
    }
    renderGameCards();
}

function renderGameCards() {
    const container = document.getElementById('game-list');
    if (!container || typeof gamesList === "undefined") {
        container.innerHTML = "<p style='color:#0f0;'>No games found in config.js</p>";
        return;
    }
    container.innerHTML = '';
    gamesList.forEach(game => {
        const card = document.createElement('div');
        card.style = `
            background: #111;
            border: 2px solid #0f0;
            width: 280px;
            padding: 25px 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        `;
        card.innerHTML = `
            <h3 style="color:#0f0; margin: 0 0 12px 0;">${game.name}</h3>
            <p style="color:#0cc; margin: 0; font-size: 0.95rem;">${game.description || ''}</p>
        `;
        card.onclick = () => playGame(game.path || game.url);
        container.appendChild(card);
    });
}

function playGame(path) {
    if (!path) {
        alert("Game path is missing in config.js");
        return;
    }
    window.location.href = "games/" + path;
}

function backToMainFromGames() {
    const gamesContainer = document.getElementById('games-container');
    if (gamesContainer) gamesContainer.classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
}

// ====================== INITIALIZE EVERYTHING ======================
document.addEventListener('DOMContentLoaded', () => {
    if (!isCloaked) {
        startBootSequence();
    }

    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.addEventListener('click', activateCloak);
    }

    document.addEventListener('keydown', (e) => {
        if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
            activateCloak();
        }
    });

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
