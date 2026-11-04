export interface ProjectCaseStudy {
  title: string;
  headlineMetric: string;
  metricLabel: string;
  summary: string;
  backgroundColor: string;
}

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    title: 'Single-use bioreactor suite',
    headlineMetric: '4 × 2000 L',
    metricLabel: 'one control strategy',
    summary:
      'Upstream control for four single-use bioreactors: DO, pH and temperature loops, feed recipes and electronic batch records under Part 11.',
    backgroundColor: '#12364f',
  },
  {
    title: 'Protein purification line',
    headlineMetric: '−35%',
    metricLabel: 'buffer prep time',
    summary:
      'Recipe-driven chromatography and UF/DF with automated buffer preparation and in-process data capture, qualified to GAMP 5.',
    backgroundColor: '#1b3a34',
  },
  {
    title: 'Aseptic vial fill-finish line',
    headlineMetric: '0',
    metricLabel: 'Annex 1 deviations at SAT',
    summary:
      'Isolator-based filling with interlocks, environmental monitoring links and review-by-exception batch records.',
    backgroundColor: '#4a2f1a',
  },
];
