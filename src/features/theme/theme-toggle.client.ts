import { findOne } from '../../shared/dom';
import { THEME_STORAGE_KEY } from './theme-storage-key';

findOne('[data-theme-toggle]')?.addEventListener('click', () => {
  const root = document.documentElement;
  const nextTheme = root.dataset.bsTheme === 'dark' ? 'light' : 'dark';
  root.dataset.bsTheme = nextTheme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {
    // The choice still applies for this visit when storage is blocked
  }
});
