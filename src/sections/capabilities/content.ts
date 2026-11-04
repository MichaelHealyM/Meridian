export interface Capability {
  badge: string;
  title: string;
  description: string;
}

export const capabilities: Capability[] = [
  {
    badge: 'USP',
    title: 'Upstream',
    description:
      'Seed train and bioreactor control (DO, pH, temperature, feeds), media and buffer prep, CIP/SIP and harvest.',
  },
  {
    badge: 'DSP',
    title: 'Downstream',
    description:
      'Chromatography, TFF and UF/DF, viral inactivation and filtration, with recipe-driven phases and in-process data capture.',
  },
  {
    badge: 'FIL',
    title: 'Fill-finish',
    description:
      'Aseptic filling, isolator and RABS interlocks, lyophilisation, capping, inspection and environmental monitoring links.',
  },
  {
    badge: 'CSV',
    title: 'Validation and data integrity',
    description:
      'GAMP 5 documentation from URS to PQ, with audit trails, electronic signatures and ALCOA+ by design.',
  },
];
