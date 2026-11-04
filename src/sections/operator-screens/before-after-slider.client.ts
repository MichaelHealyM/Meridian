import { findAll, requireOne } from '../../shared/dom';

findAll('.before-after').forEach((slider) => {
  const control = requireOne<HTMLInputElement>('.before-after__control', slider);
  control.addEventListener('input', () =>
    slider.style.setProperty('--divider-position', `${control.value}%`),
  );
});
