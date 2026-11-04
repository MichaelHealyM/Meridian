export interface ScreenTag {
  label: string;
  /** Colour this tag has on the legacy screen, where every state is coloured. */
  legacyColor: string;
  /** The one tag an operator must act on; the high-performance screen highlights only this. */
  isAbnormal?: boolean;
  abnormalLabel?: string;
}

export const bioreactorScreenTags: ScreenTag[] = [
  { label: 'BR-101 Run', legacyColor: '#ef4444' },
  { label: 'pH 7.02', legacyColor: '#fde047' },
  { label: 'DO 18 %', legacyColor: '#ef4444', isAbnormal: true, abnormalLabel: 'DO 18 % LOW' },
  { label: 'Temp 37.0 °C', legacyColor: '#a3e635' },
  { label: 'Feed Auto', legacyColor: '#67e8f9' },
  { label: 'Agit 80 rpm', legacyColor: '#a3e635' },
  { label: 'Gas Air', legacyColor: '#e879f9' },
  { label: 'Press 0.2 bar', legacyColor: '#fde047' },
];
