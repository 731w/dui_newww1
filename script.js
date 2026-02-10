// Menu Data Structure
const menuData = {
    "Main Menu": {
        tabs: {
            "Welcome": [
                "Start Game",
                "Tutorial",
                "Quick Match",
                "Custom Game",
                "Recent Games"
            ]
        }
    },
    "Player": {
        tabs: {
            "Profile": [
                "View Stats",
                "Edit Name",
                "Change Avatar",
                "View Achievements",
                "Rank Progress"
            ],
            "Inventory": [
                "View Items",
                "Equip Skin",
                "Manage Loadout",
                "Open Crate",
                "Trade Items"
            ]
        }
    },
    "Online": {
        tabs: {
            "Multiplayer": [
                "Find Match",
                "Create Lobby",
                "Join Friend",
                "Recent Players",
                "Leaderboards"
            ],
            "Friends": [
                "Friends List",
                "Add Friend",
                "Pending Requests",
                "Block List"
            ]
        }
    },
    "Server": {
        tabs: {
            "Connection": [
                "Select Region",
                "Server Browser",
                "Favorites",
                "Recent Servers",
                "Ping Test"
            ],
            "Settings": [
                "Max Ping",
                "Auto-Connect",
                "Server Filters",
                "Connection Type"
            ]
        }
    },
    "Weapons": {
        tabs: {
            "Primary": [
                "Assault Rifle",
                "SMG",
                "Sniper Rifle",
                "Shotgun",
                "LMG"
            ],
            "Secondary": [
                "Pistol",
                "Machine Pistol",
                "Revolver"
            ],
            "Attachments": [
                "Scopes",
                "Grips",
                "Magazines",
                "Barrels",
                "Stocks"
            ]
        }
    },
    "Vehicle": {
        tabs: {
            "Ground": [
                "Sedan",
                "SUV",
                "Motorcycle",
                "ATV",
                "Truck"
            ],
            "Air": [
                "Helicopter",
                "Plane",
                "Glider"
            ],
            "Customization": [
                "Paint Color",
                "Decals",
                "Performance",
                "Accessories"
            ]
        }
    },
    "Visual": {
        tabs: {
            "Graphics": [
                "Resolution",
                "Display Mode",
                "Texture Quality",
                "Shadow Quality",
                "Effects Quality",
                "Anti-Aliasing",
                "V-Sync"
            ],
            "Interface": [
                "HUD Scale",
                "Crosshair Style",
                "Color Scheme",
                "Opacity",
                "Show FPS"
            ]
        }
    },
    "Miscellaneous": {
        tabs: {
            "Miscellaneous": [
                "Auto-Save",
                "Screenshot Mode",
                "Developer Console",
                "Game Logs",
                "Reset Settings"
            ],
            "Freecam": [
                "Enable Freecam",
                "Movement Speed",
                "FOV",
                "Smooth Camera",
                "Hotkey"
            ],
            "Bypass": [
                "Anti-Cheat Status",
                "Debug Mode",
                "Performance Monitor",
                "Network Stats"
            ]
        }
    },
    "Settings": {
        tabs: {
            "General": [
                "Language",
                "Volume",
                "Notifications",
                "Auto-Update",
                "Save Location"
            ],
            "Controls": [
                "Key Bindings",
                "Mouse Sensitivity",
                "Controller Settings",
                "Invert Y-Axis",
                "Toggle/Hold"
            ],
            "Audio": [
                "Master Volume",
                "Music Volume",
                "SFX Volume",
                "Voice Chat",
                "Output Device"
            ]
        }
    }
};

// State Management
let state = {
    view: 'main', // 'main' or 'submenu'
    mainIndex: 0,
    submenuCategory: null,
    currentTab: 0,
    buttonIndex: 0
};

const mainMenuCategories = Object.keys(menuData);

// Audio
const clickSound = new Audio('data:audio/wav;base64,UklGRhwAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');

function playClick() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
}

// Render Main Menu
function renderMainMenu() {
    const mainMenu = document.getElementById('mainMenu');
    mainMenu.innerHTML = mainMenuCategories.map((category, index) => `
        <div class="menu-item ${index === state.mainIndex ? 'selected' : ''}" data-index="${index}">
            ${category}
            <span class="arrow">›</span>
        </div>
    `).join('');
}

// Render Submenus
function renderSubmenus() {
    const submenusContainer = document.getElementById('submenus');
    submenusContainer.innerHTML = mainMenuCategories.map(category => {
        const tabNames = Object.keys(menuData[category].tabs);
        return `
            <div class="submenu" id="submenu-${category.replace(/\s+/g, '-')}">
                <div class="tabs" id="tabs-${category.replace(/\s+/g, '-')}">
                    ${tabNames.map((tab, i) => `
                        <span class="tab ${i === 0 ? 'active' : ''}" data-tab="${i}">${tab}</span>
                        ${i < tabNames.length - 1 ? '<span class="tab-separator">|</span>' : ''}
                    `).join('')}
                </div>
                <div class="buttons" id="buttons-${category.replace(/\s+/g, '-')}">
                    <!-- Buttons rendered dynamically -->
                </div>
            </div>
        `;
    }).join('');
}

// Render Buttons for Current Tab
function renderButtons() {
    if (state.view !== 'submenu') return;
    
    const category = mainMenuCategories[state.mainIndex];
    const tabNames = Object.keys(menuData[category].tabs);
    const currentTabName = tabNames[state.currentTab];
    const buttons = menuData[category].tabs[currentTabName];
    
    const buttonsContainer = document.getElementById(`buttons-${category.replace(/\s+/g, '-')}`);
    buttonsContainer.innerHTML = buttons.map((button, index) => `
        <div class="button-item ${index === state.buttonIndex ? 'selected' : ''}" data-index="${index}">
            ${button}
        </div>
    `).join('');
}

// Show Submenu
function showSubmenu(categoryIndex) {
    state.view = 'submenu';
    state.mainIndex = categoryIndex;
    state.currentTab = 0;
    state.buttonIndex = 0;
    
    const category = mainMenuCategories[categoryIndex];
    
    // Hide main menu
    document.getElementById('mainMenu').classList.add('hidden');
    
    // Show submenu
    const submenu = document.getElementById(`submenu-${category.replace(/\s+/g, '-')}`);
    submenu.classList.add('active');
    
    // Render buttons
    renderButtons();
}

// Hide Submenu
function hideSubmenu() {
    const category = mainMenuCategories[state.mainIndex];
    
    // Hide current submenu
    const submenu = document.getElementById(`submenu-${category.replace(/\s+/g, '-')}`);
    submenu.classList.remove('active');
    
    // Show main menu
    document.getElementById('mainMenu').classList.remove('hidden');
    
    state.view = 'main';
}

// Switch Tab
function switchTab(direction) {
    if (state.view !== 'submenu') return;
    
    const category = mainMenuCategories[state.mainIndex];
    const tabNames = Object.keys(menuData[category].tabs);
    
    state.currentTab += direction;
    if (state.currentTab < 0) state.currentTab = tabNames.length - 1;
    if (state.currentTab >= tabNames.length) state.currentTab = 0;
    
    // Update tab styling
    const tabsContainer = document.getElementById(`tabs-${category.replace(/\s+/g, '-')}`);
    const tabs = tabsContainer.querySelectorAll('.tab');
    tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === state.currentTab);
    });
    
    // Reset button index and render
    state.buttonIndex = 0;
    renderButtons();
    playClick();
}

// Navigate Main Menu
function navigateMain(direction) {
    state.mainIndex += direction;
    if (state.mainIndex < 0) state.mainIndex = mainMenuCategories.length - 1;
    if (state.mainIndex >= mainMenuCategories.length) state.mainIndex = 0;
    
    renderMainMenu();
    playClick();
}

// Navigate Buttons
function navigateButtons(direction) {
    const category = mainMenuCategories[state.mainIndex];
    const tabNames = Object.keys(menuData[category].tabs);
    const currentTabName = tabNames[state.currentTab];
    const buttons = menuData[category].tabs[currentTabName];
    
    state.buttonIndex += direction;
    if (state.buttonIndex < 0) state.buttonIndex = buttons.length - 1;
    if (state.buttonIndex >= buttons.length) state.buttonIndex = 0;
    
    renderButtons();
    playClick();
}

// Activate Button
function activateButton() {
    const category = mainMenuCategories[state.mainIndex];
    const buttonsContainer = document.getElementById(`buttons-${category.replace(/\s+/g, '-')}`);
    const button = buttonsContainer.querySelector(`[data-index="${state.buttonIndex}"]`);
    
    if (button) {
        button.classList.add('pressed');
        playClick();
        
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 150);
        
        // Log action
        const tabNames = Object.keys(menuData[category].tabs);
        const currentTabName = tabNames[state.currentTab];
        const buttonName = menuData[category].tabs[currentTabName][state.buttonIndex];
        console.log(`Activated: ${category} > ${currentTabName} > ${buttonName}`);
    }
}

// Keyboard Handler
document.addEventListener('keydown', (e) => {
    if (state.view === 'main') {
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                navigateMain(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                navigateMain(1);
                break;
            case 'Enter':
                e.preventDefault();
                showSubmenu(state.mainIndex);
                playClick();
                break;
            case 'q':
            case 'Q':
                e.preventDefault();
                navigateMain(-1);
                break;
            case 'e':
            case 'E':
                e.preventDefault();
                navigateMain(1);
                break;
        }
    } else if (state.view === 'submenu') {
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                navigateButtons(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                navigateButtons(1);
                break;
            case 'Enter':
                e.preventDefault();
                activateButton();
                break;
            case 'Backspace':
                e.preventDefault();
                hideSubmenu();
                playClick();
                break;
            case 'q':
            case 'Q':
                e.preventDefault();
                switchTab(-1);
                break;
            case 'e':
            case 'E':
                e.preventDefault();
                switchTab(1);
                break;
        }
    }
});

// Initialize
renderMainMenu();
renderSubmenus();
