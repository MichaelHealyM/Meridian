import { Modal, Toast } from 'bootstrap';
import { siteConfig } from '../../config/site-config';
import { findAll, requireOne } from '../../shared/dom';
import { CONTACT_MODAL_ID } from './contact-modal-id';

type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type StatusKind = 'sending' | 'success' | 'failure';

const CONTRACT_TOPIC = 'contract';
const MODAL_CLOSE_DELAY_MS = 1500;
const STATUS_MESSAGES: Record<StatusKind, string> = {
  sending: 'Sending…',
  success: 'Thanks! An engineer will reply within one working day.',
  failure: `Could not send. Please email ${siteConfig.contact.email} instead.`,
};

const form = requireOne<HTMLFormElement>('#contact-form');
const topicSelect = requireOne<HTMLSelectElement>('#contact-topic');
const contractFields = requireOne('#contract-fields');
const statusMessage = requireOne('#contact-form-status');
const spinner = requireOne('#contact-spinner');
const spamTrap = form.elements.namedItem('_gotcha') as HTMLInputElement;

function updateContractFieldsVisibility(): void {
  const isContract = topicSelect.value === CONTRACT_TOPIC;
  contractFields.style.display = isContract ? '' : 'none';
  findAll<HTMLInputElement>('input', contractFields).forEach((input) => {
    input.required = isContract;
  });
}

function validateField(field: FormField): boolean {
  const isValid = field.checkValidity();
  field.setAttribute('aria-invalid', String(!isValid));
  return isValid;
}

function showStatus(kind: StatusKind): void {
  statusMessage.className = `form-status form-status--${kind} me-auto mb-0`;
  statusMessage.textContent = STATUS_MESSAGES[kind];
}

async function sendMessage(): Promise<void> {
  showStatus('sending');
  spinner.classList.remove('d-none');
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Form endpoint responded with ${response.status}`);

    form.reset();
    updateContractFieldsVisibility();
    showStatus('success');
    Toast.getOrCreateInstance(requireOne('#contact-sent-toast')).show();
    setTimeout(
      () => Modal.getInstance(requireOne(`#${CONTACT_MODAL_ID}`))?.hide(),
      MODAL_CLOSE_DELAY_MS,
    );
  } catch {
    showStatus('failure');
  } finally {
    spinner.classList.add('d-none');
  }
}

topicSelect.addEventListener('change', updateContractFieldsVisibility);
updateContractFieldsVisibility();

form.addEventListener('input', (event) => {
  const field = event.target as FormField;
  if (field.getAttribute('aria-invalid') === 'true') validateField(field);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = findAll<FormField>('input[name], select[name], textarea[name]', form);
  const invalidFields = fields.filter((field) => field.willValidate && !validateField(field));
  if (invalidFields.length > 0) return invalidFields[0].focus();
  if (spamTrap.value) return;
  void sendMessage();
});
