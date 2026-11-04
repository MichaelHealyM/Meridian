import { requireOne } from '../../shared/dom';

const modal = requireOne('#detail-modal');

// One modal serves every "details" button: its title and text come from the button that opened it
modal.addEventListener('show.bs.modal', (event) => {
  const trigger = (event as Event & { relatedTarget: HTMLElement }).relatedTarget;
  requireOne('#detail-modal-title', modal).textContent = trigger.dataset.detailTitle ?? '';
  requireOne('#detail-modal-body', modal).textContent = trigger.dataset.detailBody ?? '';
});
