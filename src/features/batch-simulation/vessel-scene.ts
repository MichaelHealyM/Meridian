import { requireOne } from '../../shared/dom';
import { STEP } from './batch-sequence';
import {
  MIX_DURATION_TICKS,
  TICKS_PER_SIMULATED_MINUTE,
  type BatchState,
} from './batch-simulation';

const VESSEL_BOTTOM_Y = 220;
const LIQUID_PIXELS_PER_PERCENT = 1.3;
const WARM_LIQUID_THRESHOLD_CELSIUS = 30;
const LABEL = 'font-size="10" fill="currentColor" font-family="IBM Plex Mono,monospace"';

const SCENE_MARKUP = `<svg viewBox="0 0 320 262" class="vessel-scene" role="img" aria-label="Media preparation vessel fed from tanks A and B">
  <rect x="15" y="8" width="80" height="44" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="55" y="34" text-anchor="middle" ${LABEL}>A · WFI</text>
  <rect x="225" y="8" width="80" height="44" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="265" y="34" text-anchor="middle" ${LABEL}>B · Conc.</text>
  <path class="vessel-pipe" d="M55 52V100H120"/><path class="vessel-flow vessel-flow--source-a" d="M55 52V100H120"/>
  <path class="vessel-pipe" d="M265 52V100H220"/><path class="vessel-flow vessel-flow--source-b" d="M265 52V100H220"/>
  <path class="vessel-pipe" d="M170 220V240H300"/><path class="vessel-flow vessel-flow--transfer" d="M170 220V240H300"/>
  <rect class="vessel-jacket" x="115" y="85" width="110" height="140" rx="10"/>
  <rect class="vessel-liquid" x="122" y="${VESSEL_BOTTOM_Y}" width="96" height="0"/>
  <rect x="120" y="90" width="100" height="130" rx="8" fill="none" stroke="currentColor" stroke-width="3"/>
  <path d="M120 155H220M120 103H220" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="3 3"/>
  <text x="125" y="152" ${LABEL} fill-opacity=".6">50 %</text>
  <text x="125" y="100" ${LABEL} fill-opacity=".6">90 %</text>
  <path d="M170 76V210" stroke="currentColor" stroke-width="3"/>
  <path class="vessel-impeller" d="M148 210H192"/>
  <rect class="vessel-valve vessel-valve--agitator" x="160" y="62" width="20" height="14" rx="2"/><text x="186" y="73" ${LABEL}>M-301</text>
  <rect class="vessel-valve vessel-valve--source-a" x="49" y="70" width="12" height="12" rx="2"/><text x="66" y="80" ${LABEL}>XV-101</text>
  <rect class="vessel-valve vessel-valve--source-b" x="259" y="70" width="12" height="12" rx="2"/><text x="254" y="80" text-anchor="end" ${LABEL}>XV-102</text>
  <rect class="vessel-valve vessel-valve--transfer" x="164" y="224" width="12" height="12" rx="2"/><text x="182" y="234" ${LABEL}>XV-103</text>
  <text x="300" y="256" text-anchor="end" ${LABEL}>to next unit ▶</text>
  <text class="vessel-readout vessel-readout--level" x="160" y="20" text-anchor="middle" ${LABEL}></text>
  <text class="vessel-readout vessel-readout--temperature" x="160" y="33" text-anchor="middle" ${LABEL}></text>
  <text class="vessel-readout vessel-readout--mix" x="160" y="46" text-anchor="middle" ${LABEL}></text>
</svg>`;

/** Which batch step opens each valve, runs each flow animation and runs the agitator. */
const FLOW_STEP_BY_SELECTOR = {
  '.vessel-flow--source-a': STEP.chargeA,
  '.vessel-flow--source-b': STEP.chargeB,
  '.vessel-flow--transfer': STEP.transfer,
};
const OPEN_VALVE_STEP_BY_SELECTOR = {
  '.vessel-valve--source-a': STEP.chargeA,
  '.vessel-valve--source-b': STEP.chargeB,
  '.vessel-valve--transfer': STEP.transfer,
  '.vessel-valve--agitator': STEP.mix,
};

export function mountVessel(container: HTMLElement): void {
  container.innerHTML = SCENE_MARKUP;
}

/** Updates attributes and classes only, so the CSS animations are never restarted. */
export function updateVessel(container: HTMLElement, state: BatchState): void {
  const part = (selector: string) => requireOne<SVGElement>(selector, container);

  const liquidHeight = state.levelPercent * LIQUID_PIXELS_PER_PERCENT;
  const liquid = part('.vessel-liquid');
  liquid.setAttribute('y', String(VESSEL_BOTTOM_Y - liquidHeight));
  liquid.setAttribute('height', String(liquidHeight));
  liquid.classList.toggle('is-warm', state.temperatureCelsius > WARM_LIQUID_THRESHOLD_CELSIUS);

  for (const [selector, step] of Object.entries(FLOW_STEP_BY_SELECTOR)) {
    part(selector).classList.toggle('is-active', state.stepIndex === step);
  }
  for (const [selector, step] of Object.entries(OPEN_VALVE_STEP_BY_SELECTOR)) {
    part(selector).classList.toggle('is-open', state.stepIndex === step);
  }
  part('.vessel-jacket').classList.toggle('is-active', state.stepIndex === STEP.heat);
  part('.vessel-impeller').classList.toggle('is-active', state.stepIndex === STEP.mix);

  const mixMinutes = Math.round(state.mixTicksElapsed / TICKS_PER_SIMULATED_MINUTE);
  const mixTotalMinutes = MIX_DURATION_TICKS / TICKS_PER_SIMULATED_MINUTE;
  part('.vessel-readout--level').textContent = `LT-101 ${Math.round(state.levelPercent)} %`;
  part('.vessel-readout--temperature').textContent =
    `TT-201 ${state.temperatureCelsius.toFixed(1)} °C`;
  part('.vessel-readout--mix').textContent =
    state.stepIndex === STEP.mix ? `Mix ${mixMinutes} / ${mixTotalMinutes} min` : '';
}
