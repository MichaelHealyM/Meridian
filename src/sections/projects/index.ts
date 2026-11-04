import type { PageSectionManifest } from '../../shared/types';
import ProjectsSection from './ProjectsSection.astro';

export const projectsSection: PageSectionManifest = {
  id: 'projects',
  navigationLabel: 'Projects',
  component: ProjectsSection,
};
