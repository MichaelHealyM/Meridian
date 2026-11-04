import { STEP } from './batch-sequence';

export const TICK_INTERVAL_MS = 100;
export const TICKS_PER_SIMULATED_MINUTE = 10;
export const MIX_DURATION_TICKS = 80;

const AMBIENT_TEMPERATURE_CELSIUS = 20;
const TARGET_TEMPERATURE_CELSIUS = 37;
const LEVEL_AFTER_CHARGE_A_PERCENT = 50;
const LEVEL_AFTER_CHARGE_B_PERCENT = 90;
const EMPTY_LEVEL_PERCENT = 5;
const CHARGE_PERCENT_PER_TICK = 0.75;
const TRANSFER_PERCENT_PER_TICK = 1.25;
const HEAT_CELSIUS_PER_TICK = 0.3;
const COOL_CELSIUS_PER_TICK = 0.3;
const IDLE_TICKS_BEFORE_AUTO_START = 40;

export interface BatchState {
  stepIndex: number;
  levelPercent: number;
  temperatureCelsius: number;
  mixTicksElapsed: number;
  idleTicks: number;
  repeatAutomatically: boolean;
}

export function createInitialBatchState(repeatAutomatically: boolean): BatchState {
  return {
    stepIndex: STEP.idle,
    levelPercent: 0,
    temperatureCelsius: AMBIENT_TEMPERATURE_CELSIUS,
    mixTicksElapsed: 0,
    idleTicks: 0,
    repeatAutomatically,
  };
}

export function startBatch(state: BatchState): void {
  if (state.stepIndex !== STEP.idle) return;
  state.stepIndex = STEP.chargeA;
  state.idleTicks = 0;
}

/** Moves the simulated batch forward by one tick of TICK_INTERVAL_MS. */
export function advanceBatchState(state: BatchState): void {
  switch (state.stepIndex) {
    case STEP.idle:
      state.temperatureCelsius = Math.max(
        AMBIENT_TEMPERATURE_CELSIUS,
        state.temperatureCelsius - COOL_CELSIUS_PER_TICK,
      );
      state.idleTicks = state.repeatAutomatically ? state.idleTicks + 1 : 0;
      if (state.idleTicks > IDLE_TICKS_BEFORE_AUTO_START) startBatch(state);
      break;
    case STEP.chargeA:
      state.levelPercent += CHARGE_PERCENT_PER_TICK;
      if (state.levelPercent >= LEVEL_AFTER_CHARGE_A_PERCENT) state.stepIndex = STEP.heat;
      break;
    case STEP.heat:
      state.temperatureCelsius += HEAT_CELSIUS_PER_TICK;
      if (state.temperatureCelsius >= TARGET_TEMPERATURE_CELSIUS) state.stepIndex = STEP.chargeB;
      break;
    case STEP.chargeB:
      state.levelPercent += CHARGE_PERCENT_PER_TICK;
      if (state.levelPercent >= LEVEL_AFTER_CHARGE_B_PERCENT) state.stepIndex = STEP.mix;
      break;
    case STEP.mix:
      state.mixTicksElapsed += 1;
      if (state.mixTicksElapsed >= MIX_DURATION_TICKS) {
        state.mixTicksElapsed = 0;
        state.stepIndex = STEP.transfer;
      }
      break;
    case STEP.transfer:
      state.levelPercent = Math.max(0, state.levelPercent - TRANSFER_PERCENT_PER_TICK);
      if (state.levelPercent <= EMPTY_LEVEL_PERCENT) {
        state.levelPercent = 0;
        state.stepIndex = STEP.idle;
      }
      break;
  }
}

/** How far through the current step the batch is, from 0 to 100. */
export function stepProgressPercent(state: BatchState): number {
  const fractionDone = (() => {
    switch (state.stepIndex) {
      case STEP.chargeA:
        return state.levelPercent / LEVEL_AFTER_CHARGE_A_PERCENT;
      case STEP.heat:
        return (
          (state.temperatureCelsius - AMBIENT_TEMPERATURE_CELSIUS) /
          (TARGET_TEMPERATURE_CELSIUS - AMBIENT_TEMPERATURE_CELSIUS)
        );
      case STEP.chargeB:
        return (
          (state.levelPercent - LEVEL_AFTER_CHARGE_A_PERCENT) /
          (LEVEL_AFTER_CHARGE_B_PERCENT - LEVEL_AFTER_CHARGE_A_PERCENT)
        );
      case STEP.mix:
        return state.mixTicksElapsed / MIX_DURATION_TICKS;
      case STEP.transfer:
        return (
          (LEVEL_AFTER_CHARGE_B_PERCENT - state.levelPercent) /
          (LEVEL_AFTER_CHARGE_B_PERCENT - EMPTY_LEVEL_PERCENT)
        );
      default:
        return 0;
    }
  })();
  return Math.round(Math.min(1, Math.max(0, fractionDone)) * 100);
}
