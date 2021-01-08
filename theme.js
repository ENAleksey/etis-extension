// Load Theme
function detectColorScheme() {
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "dark") {
            return true;
        }
    } else if (!window.matchMedia) {
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return true;
    }
}

darkTheme = detectColorScheme();
if (darkTheme) {
    document.documentElement.setAttribute("theme", "dark");
} else {
    document.documentElement.setAttribute("theme", "light");
}