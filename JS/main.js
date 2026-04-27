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
    // Step 1: Change title for stealth
    document.title = "Google Docs";

    // Step 2: Show the main dashboard
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainScreen = document.getElementById('main-screen');

    if (welcomeScreen) welcomeScreen.classList.add('hidden');
    if (mainScreen) mainScreen.classList.remove('hidden');

    // Step 3: Open this page in a new about:blank tab (this is the key part you want)
    const currentUrl = window.location.href;
    
    const newTab = window.open('about:blank', '_blank');
    
    if (newTab) {
        // Write the current page into the new tab
        newTab.document.write(`
            <html>
                <head>
                    <title>Google Docs</title>
                    <style>body { margin:0; padding:0; overflow:hidden; }</style>
                </head>
                <body>
                    <iframe src="${currentUrl}" style="width:100vw; height:100vh; border:none;"></iframe>
                </body>
            </html>
        `);
        newTab.document.close();

        // Optional: Try to close the original tab (many school filters block this)
        setTimeout(() => {
            try { window.close(); } catch(e) {}
        }, 300);
    } else {
        // Fallback if popup is blocked
        alert("Popup blocked! Please allow popups for this site or click again.");
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
