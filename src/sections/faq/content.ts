export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'Do you validate to GAMP 5 and Part 11?',
    answer:
      'Yes. We deliver the full lifecycle: URS, functional and design specifications, FAT, SAT and IQ/OQ/PQ, with traceability to your quality system.',
  },
  {
    question: 'Can you work inside our quality system?',
    answer:
      'Yes. We follow your SOPs and templates, or supply ours, and support change control, deviations and CAPA.',
  },
  {
    question: 'Which platforms do you support?',
    answer:
      'Emerson DeltaV, Siemens PCS 7 and Rockwell PlantPAx for control, Ignition for SCADA, plus integration with MES, LIMS and historians. We recommend what suits your site, not what we resell.',
  },
];
