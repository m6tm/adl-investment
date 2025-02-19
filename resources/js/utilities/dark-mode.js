function setDarkModeStorage(mode) {
    localStorage.setItem('darkMode', mode);
}

function getDarkModeStorage() {
    return localStorage.getItem('darkMode');
}

function updateDarkModeUI(isDark) {
    const toggler = document.getElementById('darkModeToggler');
    const span = document.getElementById('darkModeSpan');

    if (isDark) {
        document.documentElement.classList.add('dark');
        toggler.classList.remove('bg-stroke');
        toggler.classList.add('bg-primary');
        span.style.right = '4px';
        span.style.transform = 'translateY(-50%) translateX(100%)';
    } else {
        document.documentElement.classList.remove('dark');
        toggler.classList.remove('bg-primary');
        toggler.classList.add('bg-stroke');
        span.style.right = '';
        span.style.transform = 'translateY(-50%) translateX(0)';
    }
}

export function toggleDarkMode() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    updateDarkModeUI(!isDarkMode);
    setDarkModeStorage(!isDarkMode ? 'dark' : 'light');
}

// Initialize dark mode from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedMode = getDarkModeStorage();
    if (storedMode) {
        updateDarkModeUI(storedMode === 'dark');
    } else {
        updateDarkModeUI('light');
    }
});
