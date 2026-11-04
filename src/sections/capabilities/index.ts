import type { PageSectionManifest } from '../../shared/types';
import CapabilitiesSection from './CapabilitiesSection.astro';

export const capabilitiesSection: PageSectionManifest = {
  id: 'capabilities',
  navigationLabel: 'Capabilities',
  component: CapabilitiesSection,
};
