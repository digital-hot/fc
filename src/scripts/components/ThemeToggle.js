import { AppState, elements } from '/src/scripts/state/AppState.js';

function applyTheme() {
    document.documentElement.setAttribute('data-theme', AppState.theme);
    const icon = elements.themeToggle.querySelector('i');
    icon.className = AppState.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

export function toggleTheme(isInit = false) {
    if (!isInit) {
        AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', AppState.theme);
    }
    applyTheme();
}