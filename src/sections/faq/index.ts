import type { PageSectionManifest } from '../../shared/types';
import FaqSection from './FaqSection.astro';

export const faqSection: PageSectionManifest = {
  id: 'faq',
  navigationLabel: 'FAQ',
  component: FaqSection,
};
