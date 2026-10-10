// Light / dark theme: storage, applying and the sun/moon switch component.
//
// The theme is the attribute <html data-theme="light|dark"> (styles: theme.css, background.css).
// The choice is saved in localStorage under the key "theme". Without a saved choice the light
// theme is used (the original look of the interface).
// index.html applies the saved theme with a tiny inline script before the first paint, and this
// module repeats it at import time, so there is no light flash on reload.
import { html, useState, useEffect } from './bundle.js';

const KEY = 'theme';
const EVENT = 'themechange';

export function getTheme() {
  try {
    return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light';
  } catch (e) {
    return 'light'; // storage is blocked (private mode etc.)
  }
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  // colour of the browser UI (mobile address bar)
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = theme === 'dark' ? '#0b1220' : '#eef2f7';
}

export function setTheme(theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch (e) { /* ignore: the theme still switches until reload */ }
  applyTheme(theme);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: theme }));
}

applyTheme(getTheme());

const SunIcon = html`
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.5"></circle>
    <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"></path>
  </svg>`;

const MoonIcon = html`
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>`;

// Two semi-transparent icons (sun and moon): the active one is brighter.
// The component is placed with position:absolute, so the parent block must be position:relative
// (the Global Settings panel is).
export function ThemeToggle({ lang }) {
  const [theme, setThemeState] = useState(getTheme());

  useEffect(() => {
    const onChange = (e) => setThemeState(e.detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);

  const ru = lang === 'ru';
  const item = (value, label, icon) => html`
    <button
      type="button"
      data-kind=${value}
      class=${'theme-toggle__btn' + (theme === value ? ' is-active' : '')}
      aria-pressed=${theme === value}
      aria-label=${label}
      title=${label}
      onClick=${() => setTheme(value)}
    >${icon}</button>`;

  return html`
    <div class="theme-toggle" role="group" aria-label=${ru ? 'Тема оформления' : 'Colour theme'}>
      ${item('light', ru ? 'Светлая тема' : 'Light theme', SunIcon)}
      ${item('dark', ru ? 'Тёмная тема' : 'Dark theme', MoonIcon)}
    </div>`;
}
