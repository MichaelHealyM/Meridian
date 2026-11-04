import { sequenceSteps } from './batch-sequence';
import { stepProgressPercent, type BatchState } from './batch-simulation';

export function renderSequenceChart(state: BatchState): string {
  const progressPercent = stepProgressPercent(state);
  return sequenceSteps
    .map((step, index) => {
      const isActive = state.stepIndex === index;
      const progressBar =
        isActive && index > 0
          ? `<div class="sequence-step__progress"><i style="width:${progressPercent}%"></i></div>`
          : '';
      const returnsToStart = index === sequenceSteps.length - 1 ? ' ↺ S0' : '';
      return `<div class="sequence-step${index === 0 ? ' sequence-step--initial' : ''}${isActive ? ' sequence-step--active' : ''}">
        <b>${step.code}</b> ${step.name}
        <small class="sequence-step__description">${step.description}</small>${progressBar}
      </div>
      <div class="sequence-transition">T${index + 1}: ${step.exitCondition}${returnsToStart}</div>`;
    })
    .join('');
}
