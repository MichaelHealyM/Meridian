import { findAll, findOne } from '../../../shared/dom';
import { createAgitatorState, runScanCycle } from './agitator-simulation';
import { renderLadderDiagram } from './ladder-diagram';
import { renderStatementList } from './statement-list';

type PlcInput = 'start' | 'stop';

const SCAN_INTERVAL_MS = 100;
const KEYBOARD_SHORTCUTS: Record<string, PlcInput> = { s: 'start', x: 'stop' };

const agitator = createAgitatorState();
const ladderDiagram = findOne('[data-ladder-diagram]');
const statementList = findOne('[data-statement-list]');
const stateBadgeContainers = findAll('[data-plc-state-badges]');

function render(): void {
  if (ladderDiagram) ladderDiagram.innerHTML = renderLadderDiagram(agitator);
  if (statementList) statementList.innerHTML = renderStatementList(agitator);

  const stateBadges: Array<[string, boolean]> = [
    ['I0.0', agitator.startPressed],
    ['I0.1', agitator.stopPressed],
    ['Q0.0', agitator.motorRunning],
    ['T1', agitator.atSpeed],
    ['Q0.1', agitator.atSpeed],
  ];
  const badgesMarkup = stateBadges
    .map(
      ([address, isOn]) =>
        `<span class="state-badge${isOn ? ' state-badge--on' : ''}">${address}=${Number(isOn)}</span>`,
    )
    .join(' ');
  stateBadgeContainers.forEach((container) => (container.innerHTML = badgesMarkup));
}

function runScan(elapsedSeconds: number): void {
  runScanCycle(agitator, elapsedSeconds);
  render();
}

function setInput(input: PlcInput, isPressed: boolean): void {
  if (input === 'start') agitator.startPressed = isPressed;
  else agitator.stopPressed = isPressed;
  runScan(0);
}

findAll('[data-plc-input]').forEach((button) => {
  const input = button.dataset.plcInput as PlcInput;
  button.addEventListener('pointerdown', () => setInput(input, true));
  for (const releaseEvent of ['pointerup', 'pointerleave', 'pointercancel']) {
    button.addEventListener(releaseEvent, () => setInput(input, false));
  }
});

for (const keyEvent of ['keydown', 'keyup']) {
  addEventListener(keyEvent, (event) => {
    const { key, repeat, target } = event as KeyboardEvent;
    const input = KEYBOARD_SHORTCUTS[key.toLowerCase()];
    const isTypingInForm = (target as HTMLElement).closest('input, textarea, select');
    if (input && !repeat && !isTypingInForm) setInput(input, keyEvent === 'keydown');
  });
}

setInterval(() => runScan(SCAN_INTERVAL_MS / 1000), SCAN_INTERVAL_MS);
runScan(0);
