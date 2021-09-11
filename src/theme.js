export let theme = 'auto';
export let prefersColorSchemeMedia = false;

export function setupTheme() {
  if (window.matchMedia) {
    prefersColorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
  }
  detectTheme();
}

export function setDarkTheme(e) {
  document.documentElement.setAttribute('theme', e.matches ? 'dark' : 'light');
}

export function setSystemThemeDetection() {
  if (window.matchMedia) {
    prefersColorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    document.documentElement.setAttribute('theme', prefersColorSchemeMedia.matches ? 'dark' : 'light');
    prefersColorSchemeMedia.addEventListener('change', setDarkTheme);
  }
}

export function removeSystemThemeDetection() {
  if (window.matchMedia) {
    prefersColorSchemeMedia.removeEventListener('change', setDarkTheme);
  }
}

export function detectTheme() {
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
    if (theme == 'auto') {
      setSystemThemeDetection();
    } else {
      document.documentElement.setAttribute('theme', theme);
    }
  } else {
    theme = 'auto';
    setSystemThemeDetection()
  }
}

export function switchTheme(e) {
  if (theme == 'auto') {
    theme = 'light';
    e.srcElement.innerHTML = e.srcElement.innerHTML.replace('Системная', 'Светлая');
    document.documentElement.setAttribute('theme', theme);
    removeSystemThemeDetection();
  } else if (theme == 'light') {
    theme = 'dark';
    e.srcElement.innerHTML = e.srcElement.innerHTML.replace('Светлая', 'Темная');
    document.documentElement.setAttribute('theme', theme);
  } else if (theme == 'dark') {
    theme = 'auto';
    e.srcElement.innerHTML = e.srcElement.innerHTML.replace('Темная', 'Системная');
    setSystemThemeDetection();
  }

  localStorage.setItem('theme', theme);
}

