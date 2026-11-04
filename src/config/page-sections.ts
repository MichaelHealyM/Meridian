import type { PageSectionManifest } from '../shared/types';
import { heroSection } from '../sections/hero';
import { capabilitiesSection } from '../sections/capabilities';
import { liveDemosSection } from '../sections/live-demos';
import { operatorScreensSection } from '../sections/operator-screens';
import { projectsSection } from '../sections/projects';
import { projectProcessSection } from '../sections/project-process';
import { faqSection } from '../sections/faq';
import { contactSection } from '../sections/contact';

/** Order here is the order on the home page. Delete an entry to remove a section. */
export const pageSections: PageSectionManifest[] = [
  heroSection,
  capabilitiesSection,
  liveDemosSection,
  operatorScreensSection,
  projectsSection,
  projectProcessSection,
  faqSection,
  contactSection,
];
