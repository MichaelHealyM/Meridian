import type { PageSectionManifest } from '../../shared/types';
import HeroSection from './HeroSection.astro';

export const heroSection: PageSectionManifest = {
  id: 'hero',
  component: HeroSection,
};
