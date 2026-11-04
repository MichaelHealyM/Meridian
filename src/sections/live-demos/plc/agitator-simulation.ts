export const AT_SPEED_DELAY_SECONDS = 3;

export interface AgitatorState {
  startPressed: boolean;
  stopPressed: boolean;
  motorRunning: boolean;
  atSpeedTimerSeconds: number;
  atSpeed: boolean;
}

export function createAgitatorState(): AgitatorState {
  return {
    startPressed: false,
    stopPressed: false,
    motorRunning: false,
    atSpeedTimerSeconds: 0,
    atSpeed: false,
  };
}

/** One PLC scan: the motor output feeds back as its own contact (the "seal-in") to stay latched. */
export function runScanCycle(state: AgitatorState, elapsedSeconds: number): void {
  state.motorRunning = (state.startPressed || state.motorRunning) && !state.stopPressed;
  state.atSpeedTimerSeconds = state.motorRunning
    ? Math.min(AT_SPEED_DELAY_SECONDS, state.atSpeedTimerSeconds + elapsedSeconds)
    : 0;
  state.atSpeed = state.atSpeedTimerSeconds >= AT_SPEED_DELAY_SECONDS;
}
