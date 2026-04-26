// ====================== NULL_X V2.17 - MAIN.JS ======================

// Boot screen phrases
const bootPhrases = [
    "INITIALIZING NULL_X CORE...",
    "LOADING DATABASE...",
    "ESTABLISHING SECURE TUNNEL...",
    "NULL_X V2.17 ONLINE"
];

let phraseIndex = 0;
const greenTextEl = document.getElementById('green-text');

// Function to cycle through boot phrases
function startBootSequence() {
    greenTextEl.textContent = bootPhrases[phraseIndex];
    
    phraseIndex++;
    
    if (phraseIndex < bootPhrases.length) {
        // Continue to next phrase
        setTimeout(startBootSequence, 750);
    } else {
        // All phrases done → switch to welcome screen after short delay
        setTimeout(() => {
            document.getElementById('boot-screen').classList.add('hidden');
            document.getElementById('welcome-screen').classList.remove('hidden');
        }, 900);
    }
}

// Cloak function (Click anywhere on welcome screen)
function activateCloak() {
    // Try to close the tab (works if opened via JS/bookmarklet)
    try {
        window.close();
    } catch (e) {
        // Do nothing - most browsers block it
    }

    // Fallback: Go to main dashboard
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');

    // Optional: Change title for better stealth
    document.title = "Google Docs";
}

// Simple navigation between sections (placeholder for now)
function navigateTo(section) {
    if (section === 'games') {
        alert("🎮 Games section coming soon!\n\nWe'll load games from config.js here.");
        // Later: hide main-screen and show games page
    } 
    else if (section === 'proxy') {
        alert("🌐 Proxy section coming soon!");
    } 
    else if (section === 'settings') {
        alert("⚙️ Settings section coming soon!");
    }
}

// ====================== EVENT LISTENERS ======================

document.addEventListener('DOMContentLoaded', () => {
    // Start the boot animation when page loads
    startBootSequence();

    // Make the entire welcome screen clickable for cloak
    const welcomeScreen = document.getElementById('welcome-screen');
    welcomeScreen.addEventListener('click', activateCloak);

    // Keyboard support: Press any key on welcome screen to cloak
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('welcome-screen').classList.contains('hidden')) {
            activateCloak();
        }
    });
});

// Bonus: Prevent right-click menu on the whole site (common for these kinds of sites)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
