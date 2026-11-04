import type { PageSectionManifest } from '../../shared/types';
import ProjectProcessSection from './ProjectProcessSection.astro';

export const projectProcessSection: PageSectionManifest = {
  id: 'process',
  navigationLabel: 'Process',
  component: ProjectProcessSection,
};
