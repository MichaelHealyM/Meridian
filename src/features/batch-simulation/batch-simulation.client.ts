import { findAll, findOne } from '../../shared/dom';
import { sequenceSteps } from './batch-sequence';
import {
  TICK_INTERVAL_MS,
  advanceBatchState,
  createInitialBatchState,
  startBatch,
} from './batch-simulation';
import { renderSequenceChart } from './sequence-chart';
import { mountVessel, updateVessel } from './vessel-scene';

const vesselContainers = findAll('[data-batch-vessel]');
const sequenceChart = findOne('[data-sequence-chart]');
const statusBadges = findAll('[data-batch-status]');
const repeatSwitch = findOne<HTMLInputElement>('[data-batch-repeat]');

let batchState = createInitialBatchState(repeatSwitch?.checked ?? true);

function render(): void {
  const currentStep = sequenceSteps[batchState.stepIndex];
  if (sequenceChart) sequenceChart.innerHTML = renderSequenceChart(batchState);
  vesselContainers.forEach((container) => updateVessel(container, batchState));
  statusBadges.forEach((badge) => (badge.textContent = `${currentStep.code} ${currentStep.name}`));
}

vesselContainers.forEach((container) => mountVessel(container));

findOne('[data-batch-start]')?.addEventListener('click', () => startBatch(batchState));
findOne('[data-batch-reset]')?.addEventListener('click', () => {
  batchState = createInitialBatchState(batchState.repeatAutomatically);
});
repeatSwitch?.addEventListener('change', () => {
  batchState.repeatAutomatically = repeatSwitch.checked;
});

setInterval(() => {
  advanceBatchState(batchState);
  render();
}, TICK_INTERVAL_MS);
render();
