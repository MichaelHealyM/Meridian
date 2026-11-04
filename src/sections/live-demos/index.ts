import type { PageSectionManifest } from '../../shared/types';
import LiveDemosSection from './LiveDemosSection.astro';

export const liveDemosSection: PageSectionManifest = {
  id: 'live-demos',
  navigationLabel: 'Live demos',
  component: LiveDemosSection,
};
