// ====================== NULL_X V2.17 - MAIN.JS ======================
// This file works with index.html in root + CSS in CSS/ folder
// Check if the page was opened in cloak mode (via iframe)
const urlParams = new URLSearchParams(window.location.search);
const isCloaked = urlParams.get('cloaked') === 'true';

// If it's already cloaked, skip boot and welcome screens and go straight to main dashboard
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

// Boot Screen Elements
const greenTextEl = document.getElementById('green-text');

// Start the boot animation
function startBootSequence() {
    if (!greenTextEl) return;

    greenTextEl.textContent = bootPhrases[phraseIndex];
    phraseIndex++;

    if (phraseIndex < bootPhrases.length) {
        setTimeout(startBootSequence, 750);     // Change phrase every 750ms
    } else {
        // All phrases done → go to welcome screen
        setTimeout(() => {
            const bootScreen = document.getElementById('boot-screen');
            const welcomeScreen = document.getElementById('welcome-screen');
            
            if (bootScreen) bootScreen.classList.add('hidden');
            if (welcomeScreen) welcomeScreen.classList.remove('hidden');
        }, 900);
    }
}

function activateCloak() {
    // Change title for cloak
    document.title = "Google Docs";

    // Show main dashboard immediately
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainScreen = document.getElementById('main-screen');

    if (welcomeScreen) welcomeScreen.classList.add('hidden');
    if (mainScreen) mainScreen.classList.remove('hidden');

    // Open the site in a new about:blank tab (with iframe)
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

        // Optional: Try to close original tab
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
        // TODO: We'll replace this alert later with actual games page using config.js
        alert("🎮 Opening Games...\n\n(Game section with config.js coming next)");
        
        // Future code will go here to load games
    } 
    else if (section === 'proxy') {
        alert("🌐 Proxy section coming soon!");
    } 
    else if (section === 'settings') {
        alert("⚙️ Settings section coming soon!");
    }
}

// ====================== INITIALIZE EVERYTHING ======================
document.addEventListener('DOMContentLoaded', () => {
    
    // Start boot sequence
    startBootSequence();

    // Make welcome screen clickable for cloak
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.addEventListener('click', activateCloak);
    }

    // Allow pressing any key on welcome screen to cloak
    document.addEventListener('keydown', (e) => {
        if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
            activateCloak();
        }
    });

    // Disable right-click menu (common for unblocked game sites)
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
