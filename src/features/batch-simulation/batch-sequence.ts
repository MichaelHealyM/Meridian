/** Index of each step in the media-prep batch, matching `sequenceSteps`. */
export const STEP = {
  idle: 0,
  chargeA: 1,
  heat: 2,
  chargeB: 3,
  mix: 4,
  transfer: 5,
} as const;

export interface SequenceStep {
  code: string;
  name: string;
  description: string;
  /** The condition that ends this step and moves the batch to the next one. */
  exitCondition: string;
}

export const sequenceSteps: SequenceStep[] = [
  {
    code: 'S0',
    name: 'Idle',
    description: 'Vessel empty, valves closed',
    exitCondition: 'Start batch',
  },
  {
    code: 'S1',
    name: 'Charge A',
    description: 'Open XV-101: add WFI to 50 %',
    exitCondition: 'Level ≥ 50 %',
  },
  {
    code: 'S2',
    name: 'Heat',
    description: 'Jacket on: warm to 37 °C',
    exitCondition: 'Temp ≥ 37 °C',
  },
  {
    code: 'S3',
    name: 'Charge B',
    description: 'Open XV-102: add concentrate to 90 %',
    exitCondition: 'Level ≥ 90 %',
  },
  {
    code: 'S4',
    name: 'Mix',
    description: 'Agitator M-301 on for the mix time',
    exitCondition: 'Mix time elapsed',
  },
  {
    code: 'S5',
    name: 'Transfer',
    description: 'Open XV-103: move batch downstream',
    exitCondition: 'Level ≤ 5 %',
  },
];
