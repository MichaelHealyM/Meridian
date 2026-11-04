import { Offcanvas, ScrollSpy } from 'bootstrap';
import { findAll, requireOne } from '../shared/dom';

const mobileMenu = requireOne('#mobile-menu');

findAll('.nav-link', mobileMenu).forEach((link) =>
  link.addEventListener('click', () => Offcanvas.getInstance(mobileMenu)?.hide()),
);

new ScrollSpy(document.body, { target: '#main-navigation', rootMargin: '0px 0px -60%' });
