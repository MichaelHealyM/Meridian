import { requireOne } from '../../shared/dom';

const SHOW_AFTER_SCROLL_PIXELS = 600;
const button = requireOne('[data-back-to-top]');
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

addEventListener(
  'scroll',
  () => button.classList.toggle('d-none', scrollY < SHOW_AFTER_SCROLL_PIXELS),
  { passive: true },
);

button.addEventListener('click', () =>
  scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' }),
);
