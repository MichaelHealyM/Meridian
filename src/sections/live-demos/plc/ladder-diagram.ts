import type { AgitatorState } from './agitator-simulation';
import { AT_SPEED_DELAY_SECONDS } from './agitator-simulation';
import { CONTACT_HALF_WIDTH, drawCoil, drawContact, drawText, drawWire } from './svg-drawing';

const LEFT_RAIL_X = 16;
const RIGHT_RAIL_X = 624;
const MAIN_RUNG_Y = 60;
const SEAL_IN_RUNG_Y = 115;
const TIMER_RUNG_Y = 205;
const START_CONTACT_X = 130;
const STOP_CONTACT_X = 300;
const COIL_X = 520;
const SEAL_IN_BRANCH_START_X = 70;
const SEAL_IN_BRANCH_JOIN_X = 210;
const TIMER_BOX = { x: 250, width: 140, height: 56 };

const startContactLeftX = START_CONTACT_X - CONTACT_HALF_WIDTH;
const startContactRightX = START_CONTACT_X + CONTACT_HALF_WIDTH;
const stopContactLeftX = STOP_CONTACT_X - CONTACT_HALF_WIDTH;
const stopContactRightX = STOP_CONTACT_X + CONTACT_HALF_WIDTH;
const coilLeftX = COIL_X - CONTACT_HALF_WIDTH;
const coilRightX = COIL_X + CONTACT_HALF_WIDTH;

export function renderLadderDiagram(state: AgitatorState): string {
  const start = drawContact({
    x: START_CONTACT_X,
    y: MAIN_RUNG_Y,
    address: 'I0.0',
    tag: 'START',
    isNormallyClosed: false,
    isInputActive: state.startPressed,
    isPoweredIn: true,
  });
  const sealIn = drawContact({
    x: START_CONTACT_X,
    y: SEAL_IN_RUNG_Y,
    address: 'Q0.0',
    tag: 'SEAL-IN',
    isNormallyClosed: false,
    isInputActive: state.motorRunning,
    isPoweredIn: true,
  });
  const isPoweredAtBranchJoin = start.isPoweredOut || sealIn.isPoweredOut;
  const stop = drawContact({
    x: STOP_CONTACT_X,
    y: MAIN_RUNG_Y,
    address: 'I0.1',
    tag: 'STOP',
    isNormallyClosed: true,
    isInputActive: state.stopPressed,
    isPoweredIn: isPoweredAtBranchJoin,
  });
  const motorContact = drawContact({
    x: START_CONTACT_X,
    y: TIMER_RUNG_Y,
    address: 'Q0.0',
    tag: 'AGIT',
    isNormallyClosed: false,
    isInputActive: state.motorRunning,
    isPoweredIn: true,
  });

  const timerBoxLeftX = TIMER_BOX.x;
  const timerBoxRightX = TIMER_BOX.x + TIMER_BOX.width;
  const timerBoxCenterX = TIMER_BOX.x + TIMER_BOX.width / 2;
  const timerBoxTopY = TIMER_RUNG_Y - TIMER_BOX.height / 2;

  return (
    `<svg viewBox="0 0 640 250" class="ladder-svg" role="img" aria-label="Ladder logic with live power flow">` +
    `<path d="M${LEFT_RAIL_X} 10V240M${RIGHT_RAIL_X} 10V240" stroke="currentColor" stroke-width="4"/>` +
    drawText(24, 24, 'Rung 1: agitator M-301 start/stop with seal-in', { anchor: 'start' }) +
    drawText(24, 165, 'Rung 2: agitator proven at speed after 3 s', { anchor: 'start' }) +
    // Rung 1: START in parallel with the seal-in contact, in series with STOP, driving the agitator coil
    drawWire(LEFT_RAIL_X, MAIN_RUNG_Y, startContactLeftX, MAIN_RUNG_Y, true) +
    drawWire(SEAL_IN_BRANCH_START_X, MAIN_RUNG_Y, SEAL_IN_BRANCH_START_X, SEAL_IN_RUNG_Y, true) +
    drawWire(SEAL_IN_BRANCH_START_X, SEAL_IN_RUNG_Y, startContactLeftX, SEAL_IN_RUNG_Y, true) +
    start.svg +
    sealIn.svg +
    drawWire(
      startContactRightX,
      MAIN_RUNG_Y,
      SEAL_IN_BRANCH_JOIN_X,
      MAIN_RUNG_Y,
      start.isPoweredOut,
    ) +
    drawWire(
      startContactRightX,
      SEAL_IN_RUNG_Y,
      SEAL_IN_BRANCH_JOIN_X,
      SEAL_IN_RUNG_Y,
      sealIn.isPoweredOut,
    ) +
    drawWire(
      SEAL_IN_BRANCH_JOIN_X,
      SEAL_IN_RUNG_Y,
      SEAL_IN_BRANCH_JOIN_X,
      MAIN_RUNG_Y,
      isPoweredAtBranchJoin,
    ) +
    drawWire(
      SEAL_IN_BRANCH_JOIN_X,
      MAIN_RUNG_Y,
      stopContactLeftX,
      MAIN_RUNG_Y,
      isPoweredAtBranchJoin,
    ) +
    stop.svg +
    drawWire(stopContactRightX, MAIN_RUNG_Y, coilLeftX, MAIN_RUNG_Y, stop.isPoweredOut) +
    drawCoil({
      x: COIL_X,
      y: MAIN_RUNG_Y,
      address: 'Q0.0',
      tag: 'AGIT',
      isEnergized: state.motorRunning,
    }) +
    drawWire(coilRightX, MAIN_RUNG_Y, RIGHT_RAIL_X, MAIN_RUNG_Y, stop.isPoweredOut) +
    // Rung 2: the running agitator starts an on-delay timer that proves it is at speed
    drawWire(LEFT_RAIL_X, TIMER_RUNG_Y, startContactLeftX, TIMER_RUNG_Y, true) +
    motorContact.svg +
    drawWire(
      startContactRightX,
      TIMER_RUNG_Y,
      timerBoxLeftX,
      TIMER_RUNG_Y,
      motorContact.isPoweredOut,
    ) +
    `<rect x="${timerBoxLeftX}" y="${timerBoxTopY}" width="${TIMER_BOX.width}" height="${TIMER_BOX.height}" fill="none" stroke="${motorContact.isPoweredOut ? '#1f9d6b' : '#9aa7b2'}" stroke-width="3"/>` +
    drawText(timerBoxCenterX, timerBoxTopY + 19, 'TON  T1') +
    drawText(timerBoxCenterX, timerBoxTopY + 35, `PT ${AT_SPEED_DELAY_SECONDS} s`, {
      opacity: 0.6,
    }) +
    drawText(timerBoxCenterX, timerBoxTopY + 49, `ET ${state.atSpeedTimerSeconds.toFixed(1)} s`, {
      opacity: 0.6,
    }) +
    drawWire(timerBoxRightX, TIMER_RUNG_Y, coilLeftX, TIMER_RUNG_Y, state.atSpeed) +
    drawCoil({
      x: COIL_X,
      y: TIMER_RUNG_Y,
      address: 'Q0.1',
      tag: 'AT SPEED',
      isEnergized: state.atSpeed,
    }) +
    drawWire(coilRightX, TIMER_RUNG_Y, RIGHT_RAIL_X, TIMER_RUNG_Y, state.atSpeed) +
    '</svg>'
  );
}
