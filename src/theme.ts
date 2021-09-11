export let theme = 'auto';
export let prefersColorSchemeMedia: MediaQueryList;

export function setupTheme() {
  if (window.matchMedia) {
    prefersColorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
  }
  detectTheme();
}

export function setDarkTheme(e: MediaQueryListEvent) {
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

export function switchTheme(e: MouseEvent) {
  const elem = e.target as HTMLElement;

  if (theme == 'auto') {
    theme = 'light';
    elem.innerHTML = elem.innerText.replace('Системная', 'Светлая');
    document.documentElement.setAttribute('theme', theme);
    removeSystemThemeDetection();
  } else if (theme == 'light') {
    theme = 'dark';
    elem.innerHTML = elem.innerHTML.replace('Светлая', 'Темная');
    document.documentElement.setAttribute('theme', theme);
  } else if (theme == 'dark') {
    theme = 'auto';
    elem.innerHTML = elem.innerHTML.replace('Темная', 'Системная');
    setSystemThemeDetection();
  }

  localStorage.setItem('theme', theme);
}

