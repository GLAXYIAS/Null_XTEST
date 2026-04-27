// ====================== NULL_X V2.17 - MAIN.JS ======================
// This file works with index.html in root + CSS in CSS/ folder

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
    // Change title immediately for cloak
    document.title = "Google Docs";

    // Hide welcome and show main dashboard
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainScreen = document.getElementById('main-screen');

    if (welcomeScreen) welcomeScreen.classList.add('hidden');
    if (mainScreen) mainScreen.classList.remove('hidden');

    // Try to close tab AFTER showing the dashboard (better behavior)
    setTimeout(() => {
        try {
            window.close();
        } catch (e) {
            // Normal - most browsers block auto-close
            console.log("Tab close was blocked - dashboard shown instead");
        }
    }, 100);
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
