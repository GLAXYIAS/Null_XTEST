// ====================== NULL_X V2.17 - MAIN.JS ======================

// Check if the page was opened in cloak mode (via iframe)
const urlParams = new URLSearchParams(window.location.search);
const isCloaked = urlParams.get('cloaked') === 'true';

// If already cloaked, skip boot and welcome screens
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

// Start the boot animation
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

// Improved Cloak Function
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
        alert("🎮 Games section coming soon!\n\nWe'll add config.js here next.");
    }
    else if (section === 'proxy') {
        showProxy();          // ← This now calls the proxy
    }
    else if (section === 'settings') {
        alert("⚙️ Settings section coming soon!");
    }
}

// Show Proxy in full-screen iframe
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

// Go back to main menu from proxy
function backToMain() {
    const proxyContainer = document.getElementById('proxy-container');
    if (proxyContainer) {
        proxyContainer.classList.add('hidden');
    }
    document.getElementById('main-screen').classList.remove('hidden');
}

// ====================== INITIALIZE EVERYTHING ======================
document.addEventListener('DOMContentLoaded', () => {
    
    // Start boot sequence (only if not cloaked)
    if (!isCloaked) {
        startBootSequence();
    }

    // Make welcome screen clickable for cloak
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.addEventListener('click', activateCloak);
    }

    // Keyboard support for cloak
    document.addEventListener('keydown', (e) => {
        if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
            activateCloak();
        }
    });

    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
