import type { AgitatorState } from './agitator-simulation';

interface StatementLine {
  instruction: string;
  comment: string;
  /** The "result of logic" after this instruction; lines with a true result light up. */
  resultOfLogic: (state: AgitatorState) => boolean;
}

const startOrSealedIn = (state: AgitatorState) => state.startPressed || state.motorRunning;

const statementLines: StatementLine[] = [
  { instruction: 'A(', comment: '', resultOfLogic: () => false },
  { instruction: 'O   I0.0', comment: 'START', resultOfLogic: (state) => state.startPressed },
  { instruction: 'O   Q0.0', comment: 'SEAL-IN', resultOfLogic: startOrSealedIn },
  { instruction: ')', comment: '', resultOfLogic: startOrSealedIn },
  { instruction: 'AN  I0.1', comment: 'STOP (NC)', resultOfLogic: (state) => state.motorRunning },
  { instruction: '=   Q0.0', comment: 'AGIT', resultOfLogic: (state) => state.motorRunning },
  { instruction: 'A   Q0.0', comment: '', resultOfLogic: (state) => state.motorRunning },
  { instruction: 'L   S5T#3S', comment: '', resultOfLogic: () => false },
  { instruction: 'SD  T1', comment: 'on-delay', resultOfLogic: (state) => state.motorRunning },
  { instruction: 'A   T1', comment: '', resultOfLogic: (state) => state.atSpeed },
  { instruction: '=   Q0.1', comment: 'AT SPEED', resultOfLogic: (state) => state.atSpeed },
];

const INSTRUCTION_COLUMN_WIDTH = 12;

export function renderStatementList(state: AgitatorState): string {
  return statementLines
    .map(({ instruction, comment, resultOfLogic }, index) => {
      const activeClass = resultOfLogic(state) ? ' statement-line--active' : '';
      const commentText = comment ? `// ${comment}` : '';
      return `<div class="statement-line${activeClass}"><i>${index + 1}</i><code>${instruction.padEnd(INSTRUCTION_COLUMN_WIDTH)}${commentText}</code></div>`;
    })
    .join('');
}
